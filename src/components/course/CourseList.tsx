import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, CheckCircle2, Circle } from "lucide-react";
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
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground mt-2 text-lg">{description}</p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson, index) => (
          <Card key={lesson.id} className={`transition-colors ${lesson.completed ? "bg-muted/50" : "hover:border-primary/50"}`}>
            <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-4">
                <div className="mt-1 sm:mt-0">
                  {lesson.completed ? (
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  ) : (
                    <Circle className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <div className="text-sm text-muted-foreground font-medium mb-1">Lesson {String(lesson.order).padStart(2, '0')}</div>
                  <h3 className="text-lg font-semibold">{lesson.title}</h3>
                  <div className="text-sm text-muted-foreground mt-1 flex items-center">
                    <PlayCircle className="h-4 w-4 mr-1" /> {lesson.duration}
                  </div>
                </div>
              </div>
              
              <Link href={`/lesson/${lesson.id}`} className="w-full sm:w-auto">
                <Button variant={lesson.completed ? "outline" : "default"} className="w-full">
                  {lesson.completed ? "Watch Again" : "Watch Lesson"}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
