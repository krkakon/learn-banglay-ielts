import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Invalid email or password. Please try again." }, { status: 400 });
    }

    let user = await prisma.user.findUnique({
      where: { email },
    });

    // Auto-seed admin user on first login if not yet created
    if (!user && email.toLowerCase() === "admin@learnbanglayielts.com" && password === "admin123") {
      const adminPassword = await bcrypt.hash("admin123", 10);
      user = await prisma.user.create({
        data: {
          email: "admin@learnbanglayielts.com",
          full_name: "Admin User",
          password_hash: adminPassword,
          role: "admin",
          account_status: "active",
          enrollment_status: "approved",
        },
      });
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
