import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { full_name, email, phone, password, confirm_password } = await req.json();

    if (!full_name || !email || !password || !confirm_password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (password !== confirm_password) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists. Please log in instead." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        full_name,
        email,
        phone,
        password_hash: hashedPassword,
      },
    });

    return NextResponse.json({ message: "Registration successful. You can now log in." }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
