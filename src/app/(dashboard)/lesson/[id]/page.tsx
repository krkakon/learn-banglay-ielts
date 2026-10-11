import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, PlayCircle, CheckCircle2, BookOpen, Circle } from "lucide-react";
import Link from "next/link";
import { VideoPlayer } from "@/components/course/VideoPlayer";
import { getLessonById, getAdjacentLessons, MODULES_INFO } from "@/lib/coursesData";

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = await params;
  const lessonId = unwrappedParams.id;
  
  const foundLesson = getLessonById(lessonId);
  const { prev, next, moduleLessons } = getAdjacentLessons(lessonId);

  // Fallback if accessed via direct URL before link added
  const lesson = foundLesson || {
    id: lessonId,
    moduleId: "listening" as const,
    moduleName: "IELTS Course",
    order: 1,
    title: `Lesson ${lessonId}`,
    description: "This IELTS lesson is being configured. Once the instructor adds the video stream link, it will appear here immediately.",
    videoUrl: "",
    duration: "15:00",
    completed: false,
    keyPoints: [
      "Understand the key IELTS exam scoring rubrics.",
      "Identify high-frequency vocabulary and trap options.",
      "Apply native-speaker timing strategies under exam pressure."
    ]
  };

  const currentModule = MODULES_INFO[lesson.moduleId];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center text-sm text-muted-foreground">
        <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
        <span className="mx-2">/</span>
        <Link href={currentModule?.href || "/dashboard"} className="hover:text-primary transition-colors">
          {lesson.moduleName}
        </Link>
        <span className="mx-2">/</span>
        <span className="font-medium text-foreground truncate max-w-[200px] sm:max-w-none">{lesson.title}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Video & Content Column */}
        <div className="flex-1 space-y-6">
          {/* Universal Video Player (Supports Google Drive & YouTube) */}
          <VideoPlayer url={lesson.videoUrl} title={lesson.title} />

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 text-foreground">
              {lesson.title}
            </h1>
            <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-3 mb-6">
              <span className="flex items-center">
                <PlayCircle className="h-4 w-4 mr-1 text-primary" /> {lesson.duration}
              </span>
              <span>•</span>
              <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-medium text-xs">
                {lesson.moduleName}
              </span>
            </div>
            
            <div className="prose prose-sm sm:prose max-w-none text-foreground/80 space-y-4">
              <h3 className="text-xl font-semibold mb-2 text-foreground">Lesson Overview</h3>
              <p className="leading-relaxed">{lesson.description}</p>
              
              {lesson.keyPoints && lesson.keyPoints.length > 0 && (
                <div className="bg-muted/40 p-4 rounded-xl border border-muted">
                  <h4 className="font-semibold text-foreground text-sm mb-2">Key Takeaways:</h4>
                  <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground">
                    {lesson.keyPoints.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t mt-8">
            {prev ? (
              <Link href={`/lesson/${prev.id}`} className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous: {prev.title.slice(0, 20)}...
                </Button>
              </Link>
            ) : (
              <Button variant="outline" disabled className="w-full sm:w-auto opacity-50">
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous Lesson
              </Button>
            )}
            
            <Button variant={lesson.completed ? "outline" : "default"} className="w-full sm:w-auto">
              <CheckCircle2 className="mr-2 h-4 w-4" /> 
              {lesson.completed ? "Completed" : "Mark as Completed"}
            </Button>

            {next ? (
              <Link href={`/lesson/${next.id}`} className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto">
                  Next: {next.title.slice(0, 20)}... <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <Link href={currentModule?.href || "/dashboard"} className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto">
                  Back to Module <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Sidebar Lesson List */}
        <div className="w-full lg:w-80 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              {lesson.moduleName}
            </h3>
            <span className="text-xs text-muted-foreground">
              {moduleLessons.length} Lessons
            </span>
          </div>

          <Card className="bg-card shadow-sm border">
            <CardContent className="p-0">
              {moduleLessons.length === 0 ? (
                <div className="p-6 text-center text-sm text-muted-foreground">
                  <PlayCircle className="h-8 w-8 mx-auto text-muted-foreground/40 mb-2" />
                  No other lessons in this module yet.
                </div>
              ) : (
                <div className="divide-y max-h-[500px] overflow-y-auto">
                  {moduleLessons.map((item) => {
                    const isActive = item.id === lessonId;
                    return (
                      <Link 
                        href={`/lesson/${item.id}`} 
                        key={item.id} 
                        className={`flex items-center p-4 hover:bg-muted/70 transition-colors ${
                          isActive ? 'bg-primary/10 border-l-4 border-primary font-medium' : ''
                        }`}
                      >
                        <div className="flex-1 min-w-0 pr-2">
                          <div className={`text-sm truncate ${isActive ? 'text-primary font-semibold' : 'text-foreground'}`}>
                            {item.title}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5 flex items-center">
                            <PlayCircle className="h-3 w-3 mr-1" /> {item.duration}
                          </div>
                        </div>
                        {item.completed ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                        ) : (
                          <Circle className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
