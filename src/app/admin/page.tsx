import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, Video, FileText, CheckCircle2, Clock } from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    { title: "Total Students", value: "1,248", icon: Users, color: "text-blue-600" },
    { title: "Active Students", value: "856", icon: CheckCircle2, color: "text-green-600" },
    { title: "Pending Approvals", value: "12", icon: Clock, color: "text-orange-600" },
    { title: "Total Lessons", value: "64", icon: Video, color: "text-purple-600" },
    { title: "Total Modules", value: "4", icon: BookOpen, color: "text-indigo-600" },
    { title: "Study PDFs", value: "24", icon: FileText, color: "text-red-600" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-500 mt-2">Overview of platform statistics and recent activities.</p>
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
          <CardHeader>
            <CardTitle>Recent Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-sm">Student Name {i}</p>
                    <p className="text-xs text-slate-500">student{i}@example.com</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">Approved</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Platform Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Listening Lessons</span>
                <span className="font-medium">18 Active</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Reading Lessons</span>
                <span className="font-medium">15 Active</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Writing Lessons</span>
                <span className="font-medium">12 Active</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Speaking Lessons</span>
                <span className="font-medium">19 Active</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
