import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";
import { getAllStudents, addStudent } from "@/lib/studentsStore";

async function verifyAdmin() {
  const sessionCookie = (await cookies()).get("session")?.value;
  const session = await decrypt(sessionCookie);
  return session && session.role === "admin";
}

// GET: Fetch all students
export async function GET() {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    let dbStudents: any[] = [];
    try {
      dbStudents = await prisma.user.findMany({
        where: { role: "student" },
        orderBy: { created_at: "desc" },
        select: {
          id: true,
          full_name: true,
          email: true,
          phone: true,
          role: true,
          account_status: true,
          enrollment_status: true,
          created_at: true,
          last_login_at: true,
        },
      });
    } catch (dbErr) {
      console.warn("Could not query students table yet:", dbErr);
    }

    // Merge registered students from studentsStore (e.g. Hillmoon Nusrat, Demo Student)
    const storeStudents = getAllStudents().map((s) => ({
      id: s.id,
      full_name: s.full_name,
      email: s.email,
      phone: s.phone,
      role: s.role,
      account_status: s.account_status,
      enrollment_status: s.enrollment_status,
      created_at: s.created_at,
      last_login_at: s.last_login_at,
    }));

    // Avoid duplicates by email
    const allStudents = [...dbStudents];
    for (const item of storeStudents) {
      if (!allStudents.some((s) => s.email.toLowerCase() === item.email.toLowerCase())) {
        allStudents.push(item);
      }
    }

    return NextResponse.json({ students: allStudents });
  } catch (error) {
    console.error("Error in students route:", error);
    return NextResponse.json({ students: [] });
  }
}

// POST: Admin creates a new student
export async function POST(req: Request) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { full_name, email, phone, password, enrollment_status, account_status } = await req.json();

    if (!full_name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
    }

    // Add to students store
    const student = addStudent({
      full_name: full_name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : null,
      password: password.trim(),
      role: "student",
      account_status: account_status || "active",
      enrollment_status: enrollment_status || "approved",
    });

    // Best-effort database sync (non-blocking)
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.create({
        data: {
          id: student.id,
          full_name: student.full_name,
          email: student.email,
          phone: student.phone,
          password_hash: hashedPassword,
          role: "student",
          account_status: student.account_status,
          enrollment_status: student.enrollment_status,
        },
      });
    } catch (dbErr) {
      console.warn("Database sync deferred:", dbErr);
    }

    return NextResponse.json({ message: "Student created successfully", student }, { status: 201 });
  } catch (error) {
    console.error("Error creating student:", error);
    return NextResponse.json({ error: "Failed to create student" }, { status: 500 });
  }
}
