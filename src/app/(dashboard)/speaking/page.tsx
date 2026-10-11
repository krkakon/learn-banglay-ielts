import { CourseList } from "@/components/course/CourseList";
import { getLessonsByModule, MODULES_INFO } from "@/lib/coursesData";

export default function SpeakingPage() {
  const lessons = getLessonsByModule("speaking").map((l) => ({
    id: l.id,
    title: l.title,
    duration: l.duration,
    completed: l.completed || false,
    order: l.order,
  }));

  const info = MODULES_INFO.speaking;

  return (
    <CourseList 
      title={info.name} 
      description={info.description}
      lessons={lessons} 
    />
  );
}
