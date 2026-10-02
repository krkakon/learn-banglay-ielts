import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, PlayCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";

export default async function LessonPage({ params }: { params: { id: string } }) {
  // In a real app, fetch lesson data from database securely based on session authorization
  const sessionCookie = (await cookies()).get("session")?.value;
  const session = await decrypt(sessionCookie);
  const unwrappedParams = await params;
  
  const lesson = {
    id: unwrappedParams.id,
    title: `Lesson ${unwrappedParams.id.split('-')[1] || '1'}`,
    description: "This is a private lesson description. It contains detailed strategies and explanations for this specific topic.",
    duration: "15:00",
    module: "IELTS Course",
    video_url: "https://www.w3schools.com/html/mov_bbb.mp4", // Placeholder secure video
    completed: false
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center text-sm text-muted-foreground">
        <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
        <span className="mx-2">/</span>
        <span className="font-medium text-foreground">{lesson.title}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg border border-primary/20">
            {/* Private Video Player */}
            <video 
              controls 
              controlsList="nodownload" 
              className="w-full h-full object-contain"
              poster="/video-poster.jpg"
            >
              <source src={lesson.video_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">{lesson.title}</h1>
            <div className="flex items-center text-sm text-muted-foreground mb-6">
              <PlayCircle className="h-4 w-4 mr-1" /> {lesson.duration}
              <span className="mx-3">•</span>
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                {lesson.module}
              </span>
            </div>
            
            <div className="prose prose-sm sm:prose max-w-none text-foreground/80">
              <h3 className="text-xl font-semibold mb-2">Lesson Overview</h3>
              <p>{lesson.description}</p>
              <ul className="mt-4 space-y-2">
                <li>Understand the core concepts of this topic.</li>
                <li>Learn how to identify key information quickly.</li>
                <li>Practice with real exam examples.</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t mt-8">
            <Button variant="outline" className="w-full sm:w-auto">
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous Lesson
            </Button>
            
            <Button variant={lesson.completed ? "outline" : "default"} className="w-full sm:w-auto">
              <CheckCircle2 className="mr-2 h-4 w-4" /> 
              {lesson.completed ? "Completed" : "Mark as Completed"}
            </Button>

            <Button className="w-full sm:w-auto">
              Next Lesson <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Sidebar Lesson List */}
        <div className="w-full lg:w-80 space-y-4">
          <h3 className="font-semibold text-lg">Course Contents</h3>
          <Card className="bg-muted/30">
            <CardContent className="p-0">
              <div className="divide-y">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Link href={`/lesson/l-0${num}`} key={num} className={`flex items-center p-4 hover:bg-muted/80 transition-colors ${unwrappedParams.id === `l-0${num}` ? 'bg-primary/5 border-l-4 border-primary' : ''}`}>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Lesson {num}</div>
                      <div className="text-xs text-muted-foreground mt-1">15:00</div>
                    </div>
                    {num < 3 && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
