import { CourseList } from "@/components/course/CourseList";

export default function ListeningPage() {
  const lessons: Array<{ id: string; title: string; duration: string; completed: boolean; order: number }> = [];

  return (
    <CourseList 
      title="IELTS Listening" 
      description="Master the IELTS Listening module with comprehensive strategies, question breakdowns, and practice techniques."
      lessons={lessons} 
    />
  );
}
