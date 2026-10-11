import { CourseList } from "@/components/course/CourseList";

export default function WritingPage() {
  const lessons: Array<{ id: string; title: string; duration: string; completed: boolean; order: number }> = [];

  return (
    <CourseList 
      title="IELTS Writing" 
      description="Learn the perfect essay structure, advanced vocabulary, and grammar rules for a high band score."
      lessons={lessons} 
    />
  );
}
