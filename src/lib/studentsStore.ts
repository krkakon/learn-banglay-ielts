export interface StudentRecord {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  password: string;
  role: "student" | "admin";
  account_status: "active" | "inactive";
  enrollment_status: "approved" | "pending";
  created_at: string;
  last_login_at: string | null;
}

/**
 * In-memory / persistent registered students directory.
 * Includes initial registered students.
 */
export const registeredStudents: StudentRecord[] = [
  {
    id: "student-hillmoon-01",
    full_name: "Hillmoon Nusrat",
    email: "hillmoonnusrat@gmail.com",
    phone: "01560003619",
    password: "hkmoon@#",
    role: "student",
    account_status: "active",
    enrollment_status: "approved",
    created_at: "2026-10-11T21:35:00.000Z",
    last_login_at: null,
  },
  {
    id: "demo-student-01",
    full_name: "Demo Student",
    email: "student@learnbanglayielts.com",
    phone: "01700000000",
    password: "student123",
    role: "student",
    account_status: "active",
    enrollment_status: "approved",
    created_at: "2026-10-11T12:00:00.000Z",
    last_login_at: null,
  },
];

export function getAllStudents(): StudentRecord[] {
  return registeredStudents;
}

export function findStudentByEmail(email: string): StudentRecord | undefined {
  const cleanEmail = email.trim().toLowerCase();
  return registeredStudents.find(
    (s) => s.email.toLowerCase() === cleanEmail
  );
}

export function verifyStudentLogin(
  email: string,
  password: string
): StudentRecord | null {
  const cleanEmail = email.trim().toLowerCase();
  const cleanPass = password.trim();

  const student = registeredStudents.find((s) => {
    const emailMatches = s.email.toLowerCase() === cleanEmail;
    const passMatches =
      s.password === cleanPass ||
      s.password.toLowerCase() === cleanPass.toLowerCase();
    return emailMatches && passMatches;
  });

  return student || null;
}

export function addStudent(newStudent: Omit<StudentRecord, "id" | "created_at" | "last_login_at">): StudentRecord {
  const created: StudentRecord = {
    ...newStudent,
    id: `student-${Date.now().toString().slice(-6)}`,
    created_at: new Date().toISOString(),
    last_login_at: null,
  };

  registeredStudents.unshift(created);
  return created;
}
