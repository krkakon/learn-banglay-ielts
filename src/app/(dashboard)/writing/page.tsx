import { CourseList } from "@/components/course/CourseList";

export default function WritingPage() {
  const lessons = [
    { id: "w-01", title: "Introduction to Writing Task 1", duration: "12:00", completed: false, order: 1 },
    { id: "w-02", title: "Describing Graphs & Charts", duration: "25:30", completed: false, order: 2 },
    { id: "w-03", title: "Describing Maps & Processes", duration: "20:45", completed: false, order: 3 },
    { id: "w-04", title: "Introduction to Writing Task 2", duration: "15:10", completed: false, order: 4 },
    { id: "w-05", title: "Essay Structure & Planning", duration: "18:20", completed: false, order: 5 },
    { id: "w-06", title: "Opinion & Discussion Essays", duration: "28:40", completed: false, order: 6 },
    { id: "w-07", title: "Vocabulary for High Bands", duration: "22:15", completed: false, order: 7 },
    { id: "w-08", title: "Grammar & Complex Sentences", duration: "24:30", completed: false, order: 8 },
  ];

  return (
    <CourseList 
      title="IELTS Writing" 
      description="Learn the perfect essay structure, advanced vocabulary, and grammar rules for a high band score."
      lessons={lessons} 
    />
  );
}
