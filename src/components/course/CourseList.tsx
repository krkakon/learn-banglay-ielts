import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, CheckCircle2, Circle, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  order: number;
}

interface CourseListProps {
  title: string;
  description: string;
  lessons: Lesson[];
}

export function CourseList({ title, description, lessons }: CourseListProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      <div className="px-1 sm:px-0">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{title}</h1>
        <p className="text-muted-foreground mt-1.5 text-sm sm:text-base leading-relaxed">{description}</p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {lessons.length === 0 ? (
          <Card className="border-dashed p-8 sm:p-12 text-center text-muted-foreground bg-card">
            <PlayCircle className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-muted-foreground/30 mb-3" />
            <h3 className="text-base sm:text-lg font-semibold text-foreground">No lessons available yet</h3>
            <p className="text-xs sm:text-sm mt-1 max-w-sm mx-auto text-muted-foreground">
              New video lessons are being prepared. Check back soon or contact your course instructor!
            </p>
          </Card>
        ) : (
          lessons.map((lesson) => (
            <Link 
              key={lesson.id} 
              href={`/lesson/${lesson.id}`}
              className="block group"
            >
              <Card className={`transition-all duration-200 border hover:border-primary/50 hover:shadow-md ${
                lesson.completed ? "bg-muted/30" : "bg-card"
              }`}>
                <CardContent className="p-3.5 sm:p-5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div className="shrink-0">
                      {lesson.completed ? (
                        <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
                      ) : (
                        <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xs sm:text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <PlayCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                      )}
                    </div>
                    
                    <div className="min-w-0">
                      <div className="text-[11px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Lesson {String(lesson.order).padStart(2, '0')}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-foreground truncate group-hover:text-primary transition-colors">
                        {lesson.title}
                      </h3>
                      <div className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 flex items-center">
                        <span className="text-slate-400">{lesson.duration}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="shrink-0 flex items-center gap-2">
                    <Button 
                      variant={lesson.completed ? "outline" : "default"} 
                      size="sm" 
                      className="hidden sm:inline-flex text-xs h-8"
                    >
                      {lesson.completed ? "Review" : "Watch"}
                    </Button>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all sm:hidden" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
