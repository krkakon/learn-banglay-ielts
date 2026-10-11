"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  ArrowRight, 
  PlayCircle, 
  CheckCircle2, 
  BookOpen, 
  Circle, 
  FileText, 
  ListVideo, 
  Sparkles,
  ChevronLeft
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VideoPlayer } from "@/components/course/VideoPlayer";
import { Lesson, ModuleInfo } from "@/lib/coursesData";

interface LessonClientViewProps {
  lesson: Lesson;
  moduleInfo?: ModuleInfo;
  prevLesson: Lesson | null;
  nextLesson: Lesson | null;
  moduleLessons: Lesson[];
}

export function LessonClientView({
  lesson,
  moduleInfo,
  prevLesson,
  nextLesson,
  moduleLessons,
}: LessonClientViewProps) {
  const [mobileTab, setMobileTab] = useState<"overview" | "playlist">("overview");
  const [isCompleted, setIsCompleted] = useState(lesson.completed || false);

  const toggleCompleted = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6 pb-20 sm:pb-8">
      {/* Back & Breadcrumb Bar */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground px-1">
        <Link 
          href={moduleInfo?.href || "/dashboard"} 
          className="inline-flex items-center font-medium text-primary hover:underline gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>{moduleInfo?.name || "Back to Course"}</span>
        </Link>
        <span className="hidden sm:inline font-mono text-xs text-muted-foreground">
          Lesson {lesson.order} of {moduleLessons.length}
        </span>
      </div>

      {/* Main Layout Grid */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        
        {/* Left Column: Video Player & Overview Content */}
        <div className="w-full lg:flex-1 space-y-4 sm:space-y-6 min-w-0">
          
          {/* Universal Video Player (Full Width on Mobile) */}
          <VideoPlayer url={lesson.videoUrl} title={lesson.title} />

          {/* Lesson Title & Metadata */}
          <div className="px-1 sm:px-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-semibold text-xs">
                {lesson.moduleName}
              </span>
              <span className="text-xs text-muted-foreground flex items-center">
                <PlayCircle className="h-3.5 w-3.5 mr-1 text-primary" /> {lesson.duration}
              </span>
              {isCompleted && (
                <span className="bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Completed
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-foreground leading-snug">
              {lesson.title}
            </h1>

            {lesson.banglaTitle && (
              <p className="text-sm sm:text-base text-primary/80 font-medium">
                {lesson.banglaTitle}
              </p>
            )}
          </div>

          {/* Mobile Segmented Tab Switcher (Visible on screens < lg) */}
          <div className="flex lg:hidden bg-muted/60 p-1 rounded-xl border border-border">
            <button
              onClick={() => setMobileTab("overview")}
              className={`flex-1 flex items-center justify-center py-2 text-xs font-semibold rounded-lg transition-all gap-1.5 ${
                mobileTab === "overview"
                  ? "bg-background text-foreground shadow-sm font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <FileText className="h-3.5 w-3.5 text-primary" />
              Overview & Notes
            </button>
            <button
              onClick={() => setMobileTab("playlist")}
              className={`flex-1 flex items-center justify-center py-2 text-xs font-semibold rounded-lg transition-all gap-1.5 ${
                mobileTab === "playlist"
                  ? "bg-background text-foreground shadow-sm font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ListVideo className="h-3.5 w-3.5 text-primary" />
              Playlist ({moduleLessons.length})
            </button>
          </div>

          {/* Content Block: Overview & Takeaways */}
          <div className={`${mobileTab === "playlist" ? "hidden lg:block" : "block"} space-y-4 px-1 sm:px-0`}>
            <div className="bg-card rounded-2xl p-4 sm:p-6 border shadow-sm space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Lesson Overview
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                {lesson.description}
              </p>

              {lesson.keyPoints && lesson.keyPoints.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border space-y-2.5">
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary">
                    🎯 Key Takeaways & Exam Tactics:
                  </h4>
                  <ul className="space-y-2">
                    {lesson.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start text-xs sm:text-sm text-foreground/80 gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Playlist View (When Mobile Tab = playlist) */}
          <div className={`${mobileTab === "overview" ? "hidden" : "block lg:hidden"}`}>
            <Card className="border shadow-sm overflow-hidden">
              <div className="p-3 bg-muted/40 border-b text-xs font-bold text-muted-foreground uppercase">
                {lesson.moduleName} Curriculum ({moduleLessons.length} Lessons)
              </div>
              <div className="divide-y max-h-[400px] overflow-y-auto">
                {moduleLessons.map((item) => {
                  const isActive = item.id === lesson.id;
                  return (
                    <Link
                      key={item.id}
                      href={`/lesson/${item.id}`}
                      className={`flex items-center p-3.5 transition-colors ${
                        isActive ? "bg-primary/10 border-l-4 border-primary" : "hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex-1 min-w-0 pr-2">
                        <div className={`text-xs font-semibold truncate ${isActive ? "text-primary" : "text-foreground"}`}>
                          Lesson {item.order}: {item.title}
                        </div>
                        <div className="text-[11px] text-muted-foreground mt-0.5 flex items-center">
                          <PlayCircle className="h-3 w-3 mr-1 text-slate-400" /> {item.duration}
                        </div>
                      </div>
                      {item.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground/30 shrink-0" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Desktop Navigation Row (Hidden on mobile) */}
          <div className="hidden sm:flex items-center justify-between gap-4 pt-4 border-t">
            {prevLesson ? (
              <Link href={`/lesson/${prevLesson.id}`}>
                <Button variant="outline" size="sm" className="text-xs">
                  <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Prev: {prevLesson.title.slice(0, 18)}...
                </Button>
              </Link>
            ) : (
              <Button variant="outline" size="sm" disabled className="text-xs opacity-50">
                <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Previous Lesson
              </Button>
            )}

            <Button 
              variant={isCompleted ? "outline" : "default"} 
              size="sm"
              onClick={toggleCompleted}
              className="text-xs"
            >
              <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
              {isCompleted ? "Completed" : "Mark as Completed"}
            </Button>

            {nextLesson ? (
              <Link href={`/lesson/${nextLesson.id}`}>
                <Button size="sm" className="text-xs">
                  Next: {nextLesson.title.slice(0, 18)}... <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </Link>
            ) : (
              <Link href={moduleInfo?.href || "/dashboard"}>
                <Button variant="outline" size="sm" className="text-xs">
                  Back to Module <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Right Column: Desktop Sidebar Playlist */}
        <div className="hidden lg:block w-80 space-y-4 shrink-0">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-bold text-base flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              {lesson.moduleName}
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
              {moduleLessons.length} Lessons
            </span>
          </div>

          <Card className="bg-card shadow-sm border overflow-hidden">
            <div className="divide-y max-h-[550px] overflow-y-auto">
              {moduleLessons.map((item) => {
                const isActive = item.id === lesson.id;
                return (
                  <Link
                    key={item.id}
                    href={`/lesson/${item.id}`}
                    className={`flex items-center p-3.5 transition-colors ${
                      isActive ? "bg-primary/10 border-l-4 border-primary" : "hover:bg-muted/60"
                    }`}
                  >
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="text-[10px] text-muted-foreground font-mono uppercase font-semibold">
                        Lesson {item.order}
                      </div>
                      <div className={`text-xs font-bold truncate mt-0.5 ${isActive ? "text-primary" : "text-foreground"}`}>
                        {item.title}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-1 flex items-center">
                        <PlayCircle className="h-3 w-3 mr-1 text-slate-400" /> {item.duration}
                      </div>
                    </div>
                    {item.completed ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                    ) : (
                      <Circle className="h-4 w-4 text-muted-foreground/30 shrink-0" />
                    )}
                  </Link>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* Floating Bottom Sticky Bar for Mobile Thumb Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border p-2 sm:hidden shadow-2xl">
        <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
          {prevLesson ? (
            <Link href={`/lesson/${prevLesson.id}`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full text-xs h-9">
                <ArrowLeft className="mr-1 h-3.5 w-3.5" /> Prev
              </Button>
            </Link>
          ) : (
            <Button variant="outline" size="sm" disabled className="flex-1 text-xs h-9 opacity-40">
              <ArrowLeft className="mr-1 h-3.5 w-3.5" /> Prev
            </Button>
          )}

          <Button 
            variant={isCompleted ? "outline" : "default"} 
            size="sm"
            onClick={toggleCompleted}
            className="flex-1 text-xs h-9 font-semibold"
          >
            <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
            {isCompleted ? "Done" : "Complete"}
          </Button>

          {nextLesson ? (
            <Link href={`/lesson/${nextLesson.id}`} className="flex-1">
              <Button size="sm" className="w-full text-xs h-9 bg-primary hover:bg-primary/90">
                Next <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </Link>
          ) : (
            <Link href={moduleInfo?.href || "/dashboard"} className="flex-1">
              <Button variant="outline" size="sm" className="w-full text-xs h-9">
                Finish <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
