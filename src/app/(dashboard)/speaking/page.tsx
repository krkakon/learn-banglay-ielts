import { CourseList } from "@/components/course/CourseList";

export default function SpeakingPage() {
  const lessons = [
    { id: "s-01", title: "Speaking Part 1: Introduction", duration: "10:20", completed: false, order: 1 },
    { id: "s-02", title: "Speaking Part 2: Cue Cards", duration: "20:15", completed: false, order: 2 },
    { id: "s-03", title: "Speaking Part 3: Deep Discussion", duration: "18:40", completed: false, order: 3 },
    { id: "s-04", title: "Fluency & Coherence", duration: "15:30", completed: false, order: 4 },
    { id: "s-05", title: "Lexical Resource (Vocabulary)", duration: "22:10", completed: false, order: 5 },
    { id: "s-06", title: "Pronunciation & Intonation", duration: "19:45", completed: false, order: 6 },
    { id: "s-07", title: "Mock Speaking Interview 1", duration: "14:00", completed: false, order: 7 },
  ];

  return (
    <CourseList 
      title="IELTS Speaking" 
      description="Build confidence, fluency, and proper pronunciation for all three parts of the speaking test."
      lessons={lessons} 
    />
  );
}
