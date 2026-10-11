import { jwtVerify, SignJWT, decodeJwt } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.JWT_SECRET || "learn-banglay-ielts-super-secret-key-for-development";
const encodedKey = new TextEncoder().encode(secretKey);

export type SessionPayload = {
  id: string;
  email: string;
  role: string;
  status: string;
  enrollment_status: string;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  if (!session) return null;
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as SessionPayload;
  } catch {
    // If not local JWT, verify/decode Firebase ID token
    try {
      const decoded: any = decodeJwt(session);
      if (decoded && (decoded.user_id || decoded.sub || decoded.uid)) {
        const email = decoded.email || "";
        const isAdmin = email.toLowerCase() === "admin@learnbanglayielts.com" || decoded.admin === true;
        return {
          id: decoded.user_id || decoded.sub || decoded.uid,
          email,
          role: isAdmin ? "admin" : "student",
          status: "active",
          enrollment_status: "approved",
        } as SessionPayload;
      }
    } catch {
      return null;
    }
    return null;
  }
}

export async function createSession(payload: SessionPayload) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt(payload);
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  if (!parsed) return;
  
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: expiresAt,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  return res;
}
