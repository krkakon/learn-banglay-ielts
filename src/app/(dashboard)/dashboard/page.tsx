import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Headphones, BookOpen, PenTool, Mic, FileText, PlayCircle } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";

export default async function DashboardPage() {
  const sessionCookie = (await cookies()).get("session")?.value;
  const session = await decrypt(sessionCookie);

  // Mock progress data
  const progressData = {
    listening: { total: 20, completed: 5, percentage: 25 },
    reading: { total: 18, completed: 10, percentage: 55 },
    writing: { total: 15, completed: 0, percentage: 0 },
    speaking: { total: 12, completed: 12, percentage: 100 },
  };

  const modules = [
    { title: "IELTS Listening", href: "/listening", icon: Headphones, data: progressData.listening, color: "bg-blue-500" },
    { title: "IELTS Reading", href: "/reading", icon: BookOpen, data: progressData.reading, color: "bg-green-500" },
    { title: "IELTS Writing", href: "/writing", icon: PenTool, data: progressData.writing, color: "bg-purple-500" },
    { title: "IELTS Speaking", href: "/speaking", icon: Mic, data: progressData.speaking, color: "bg-orange-500" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {session?.email.split('@')[0]}!</h1>
        <p className="text-muted-foreground mt-2">Continue your IELTS preparation and track your progress.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {modules.map((mod) => (
          <Card key={mod.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <div className={`p-3 rounded-xl ${mod.color} bg-opacity-10`}>
                <mod.icon className={`h-8 w-8 ${mod.color.replace('bg-', 'text-')}`} />
              </div>
              <div>
                <CardTitle className="text-xl">{mod.title}</CardTitle>
                <CardDescription>{mod.data.total} lessons total</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{mod.data.completed} of {mod.data.total} completed</span>
                  <span className="text-muted-foreground">{mod.data.percentage}% Complete</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${mod.color} rounded-full transition-all duration-500 ease-in-out`}
                    style={{ width: `${mod.data.percentage}%` }}
                  />
                </div>
                <div className="pt-2">
                  <Link href={mod.href}>
                    <Button className="w-full">
                      <PlayCircle className="mr-2 h-4 w-4" /> View Course
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* PDF Download Section */}
      <div className="pt-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <FileText className="mr-3 h-6 w-6 text-primary" />
          📚 Download PDF Materials
        </h2>
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="flex flex-col sm:flex-row items-center justify-between p-6">
            <div className="mb-4 sm:mb-0">
              <h3 className="text-lg font-semibold">Study Materials Library</h3>
              <p className="text-muted-foreground text-sm">Access exclusive IELTS PDF guides and practice tests.</p>
            </div>
            <Link href="/pdfs">
              <Button size="lg">Go to Downloads</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
