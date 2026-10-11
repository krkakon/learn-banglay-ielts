import { CourseList } from "@/components/course/CourseList";
import { getLessonsByModule, MODULES_INFO } from "@/lib/coursesData";

export default function ListeningPage() {
  const lessons = getLessonsByModule("listening").map((l) => ({
    id: l.id,
    title: l.title,
    duration: l.duration,
    completed: l.completed || false,
    order: l.order,
  }));

  const info = MODULES_INFO.listening;

  return (
    <CourseList 
      title={info.name} 
      description={info.description}
      lessons={lessons} 
    />
  );
}
