import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, Video, FileText, CheckCircle2, Clock, UserPlus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminDashboardPage() {
  let totalStudents = 0;
  let activeStudents = 0;
  let pendingStudents = 0;
  let recentStudents: Array<{
    id: string;
    full_name: string;
    email: string;
    enrollment_status: string;
    account_status: string;
    created_at: Date;
  }> = [];

  try {
    totalStudents = await prisma.user.count({ where: { role: "student" } });
    activeStudents = await prisma.user.count({ where: { role: "student", account_status: "active" } });
    pendingStudents = await prisma.user.count({ where: { role: "student", enrollment_status: "pending" } });
    recentStudents = await prisma.user.findMany({
      where: { role: "student" },
      orderBy: { created_at: "desc" },
      take: 5,
      select: {
        id: true,
        full_name: true,
        email: true,
        enrollment_status: true,
        account_status: true,
        created_at: true,
      },
    });
  } catch (err) {
    console.error("Error loading admin dashboard stats:", err);
  }

  const stats = [
    { title: "Total Students", value: totalStudents.toString(), icon: Users, color: "text-blue-600" },
    { title: "Active Students", value: activeStudents.toString(), icon: CheckCircle2, color: "text-green-600" },
    { title: "Pending Approvals", value: pendingStudents.toString(), icon: Clock, color: "text-amber-600" },
    { title: "IELTS Modules", value: "4", icon: BookOpen, color: "text-purple-600" },
    { title: "Private Lessons", value: "64", icon: Video, color: "text-indigo-600" },
    { title: "Study PDFs", value: "24", icon: FileText, color: "text-red-600" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500 mt-1">Real-time overview of students, course access, and platform activities.</p>
        </div>
        <Link href="/admin/students">
          <Button className="bg-primary hover:bg-primary/90 text-white font-medium flex items-center shadow-md shadow-primary/20">
            <UserPlus className="mr-2 h-4 w-4" /> Manage Students
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-slate-500">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle>Recent Students</CardTitle>
            <Link href="/admin/students" className="text-xs font-medium text-primary hover:underline">
              View All
            </Link>
          </CardHeader>
          <CardContent>
            {recentStudents.length === 0 ? (
              <div className="py-8 text-center text-slate-500 text-sm">
                No students registered yet.
              </div>
            ) : (
              <div className="space-y-4">
                {recentStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="font-semibold text-sm text-slate-900">{student.full_name}</p>
                      <p className="text-xs text-slate-500">{student.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                        student.enrollment_status === 'approved' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {student.enrollment_status === 'approved' ? 'Course Approved' : 'Pending'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle>Platform Modules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm py-1 border-b">
                <span className="text-slate-600 font-medium">🎧 IELTS Listening</span>
                <span className="font-semibold text-green-600">Active</span>
              </div>
              <div className="flex justify-between items-center text-sm py-1 border-b">
                <span className="text-slate-600 font-medium">📖 IELTS Reading</span>
                <span className="font-semibold text-green-600">Active</span>
              </div>
              <div className="flex justify-between items-center text-sm py-1 border-b">
                <span className="text-slate-600 font-medium">✍️ IELTS Writing</span>
                <span className="font-semibold text-green-600">Active</span>
              </div>
              <div className="flex justify-between items-center text-sm py-1">
                <span className="text-slate-600 font-medium">🗣️ IELTS Speaking</span>
                <span className="font-semibold text-green-600">Active</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
