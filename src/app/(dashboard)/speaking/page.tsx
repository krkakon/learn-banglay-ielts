import { CourseList } from "@/components/course/CourseList";

export default function SpeakingPage() {
  const lessons: Array<{ id: string; title: string; duration: string; completed: boolean; order: number }> = [];

  return (
    <CourseList 
      title="IELTS Speaking" 
      description="Build confidence, fluency, and proper pronunciation for all three parts of the speaking test."
      lessons={lessons} 
    />
  );
}
