import { CourseList } from "@/components/course/CourseList";

export default function ListeningPage() {
  const lessons = [
    { id: "l-01", title: "Introduction to IELTS Listening", duration: "12:30", completed: true, order: 1 },
    { id: "l-02", title: "Listening Question Types", duration: "15:45", completed: true, order: 2 },
    { id: "l-03", title: "Form Completion", duration: "18:20", completed: false, order: 3 },
    { id: "l-04", title: "Multiple Choice", duration: "20:10", completed: false, order: 4 },
    { id: "l-05", title: "Map & Diagram", duration: "22:15", completed: false, order: 5 },
    { id: "l-06", title: "Sentence Completion", duration: "14:50", completed: false, order: 6 },
    { id: "l-07", title: "Matching Questions", duration: "19:05", completed: false, order: 7 },
    { id: "l-08", title: "Listening Practice Test", duration: "35:00", completed: false, order: 8 },
  ];

  return (
    <CourseList 
      title="IELTS Listening" 
      description="Master the IELTS Listening module with comprehensive strategies, question breakdowns, and practice techniques."
      lessons={lessons} 
    />
  );
}
