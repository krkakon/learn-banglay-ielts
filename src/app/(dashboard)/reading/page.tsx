import { CourseList } from "@/components/course/CourseList";

export default function ReadingPage() {
  const lessons: Array<{ id: string; title: string; duration: string; completed: boolean; order: number }> = [];

  return (
    <CourseList 
      title="IELTS Reading" 
      description="Improve your reading speed, comprehension, and accuracy for Academic and General Training."
      lessons={lessons} 
    />
  );
}
