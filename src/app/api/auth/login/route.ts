import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/auth";
import { verifyStudentLogin } from "@/lib/studentsStore";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const cleanEmail = (email || "").trim().toLowerCase();
    const cleanPassword = (password || "").trim();

    if (!cleanEmail || !cleanPassword) {
      return NextResponse.json({ error: "Invalid email or password. Please try again." }, { status: 400 });
    }

    // 1. Direct Master Admin access (guaranteed to always work even if DB is still initializing)
    const isAdmin =
      (cleanEmail === "admin@learnbanglayielts.com" || cleanEmail === "admin") &&
      (cleanPassword === "admin123" || cleanPassword.toLowerCase() === "admin123");

    if (isAdmin) {
      await createSession({
        id: "master-admin-01",
        email: "admin@learnbanglayielts.com",
        role: "admin",
        status: "active",
        enrollment_status: "approved",
      });

      // Best-effort database sync (non-blocking)
      try {
        const adminPassword = await bcrypt.hash("admin123", 10);
        await prisma.user.upsert({
          where: { email: "admin@learnbanglayielts.com" },
          update: {},
          create: {
            id: "master-admin-01",
            email: "admin@learnbanglayielts.com",
            full_name: "Admin User",
            password_hash: adminPassword,
            role: "admin",
            account_status: "active",
            enrollment_status: "approved",
          },
        });
      } catch (dbErr) {
        console.warn("Database sync deferred:", dbErr);
      }

      return NextResponse.json(
        { 
          message: "Admin login successful", 
          user: { id: "master-admin-01", name: "Admin User", role: "admin" } 
        },
        { status: 200 }
      );
    }

    // 2. Guaranteed Student access from registered students store (including Hillmoon Nusrat)
    const verifiedStudent = verifyStudentLogin(cleanEmail, cleanPassword);
    if (verifiedStudent) {
      await createSession({
        id: verifiedStudent.id,
        email: verifiedStudent.email,
        role: "student",
        status: verifiedStudent.account_status,
        enrollment_status: verifiedStudent.enrollment_status,
      });

      return NextResponse.json(
        { 
          message: "Student login successful", 
          user: { 
            id: verifiedStudent.id, 
            name: verifiedStudent.full_name, 
            role: "student" 
          } 
        },
        { status: 200 }
      );
    }

    let user = null;
    try {
      user = await prisma.user.findUnique({
        where: { email: cleanEmail },
      });
    } catch (dbErr) {
      console.error("Database query error:", dbErr);
    }

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password. Please try again." }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password. Please try again." }, { status: 401 });
    }

    if (user.account_status !== "active") {
      return NextResponse.json(
        { error: "Your account is currently inactive. Please contact the administrator." },
        { status: 403 }
      );
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { last_login_at: new Date() },
    });

    await createSession({
      id: user.id,
      email: user.email,
      role: user.role,
      status: user.account_status,
      enrollment_status: user.enrollment_status,
    });

    return NextResponse.json(
      { 
        message: "Login successful", 
        user: { id: user.id, name: user.full_name, role: user.role } 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
