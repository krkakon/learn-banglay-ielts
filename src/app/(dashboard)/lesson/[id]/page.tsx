import { LessonClientView } from "@/components/course/LessonClientView";
import { getLessonById, getAdjacentLessons, MODULES_INFO } from "@/lib/coursesData";

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = await params;
  const lessonId = unwrappedParams.id;
  
  const foundLesson = getLessonById(lessonId);
  const { prev, next, moduleLessons } = getAdjacentLessons(lessonId);

  // Fallback if accessed via direct URL before link added
  const lesson = foundLesson || {
    id: lessonId,
    moduleId: "reading" as const,
    moduleName: "IELTS Reading",
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
    <LessonClientView
      lesson={lesson}
      moduleInfo={currentModule}
      prevLesson={prev}
      nextLesson={next}
      moduleLessons={moduleLessons}
    />
  );
}
