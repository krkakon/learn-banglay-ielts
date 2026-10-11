import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";

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

    let students: any[] = [];
    try {
      students = await prisma.user.findMany({
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

    return NextResponse.json({ students });
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

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "A user with this email already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await prisma.user.create({
      data: {
        full_name,
        email,
        phone: phone || null,
        password_hash: hashedPassword,
        role: "student",
        account_status: account_status || "active",
        enrollment_status: enrollment_status || "approved",
      },
      select: {
        id: true,
        full_name: true,
        email: true,
        phone: true,
        account_status: true,
        enrollment_status: true,
        created_at: true,
      },
    });

    return NextResponse.json({ message: "Student created successfully", student }, { status: 201 });
  } catch (error) {
    console.error("Error creating student:", error);
    return NextResponse.json({ error: "Failed to create student" }, { status: 500 });
  }
}
