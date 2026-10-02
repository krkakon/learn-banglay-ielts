import { CourseList } from "@/components/course/CourseList";

export default function ReadingPage() {
  const lessons = [
    { id: "r-01", title: "Introduction to IELTS Reading", duration: "10:15", completed: false, order: 1 },
    { id: "r-02", title: "Skimming & Scanning", duration: "18:40", completed: false, order: 2 },
    { id: "r-03", title: "True / False / Not Given", duration: "25:20", completed: false, order: 3 },
    { id: "r-04", title: "Multiple Choice", duration: "15:10", completed: false, order: 4 },
    { id: "r-05", title: "Matching Headings", duration: "22:30", completed: false, order: 5 },
    { id: "r-06", title: "Sentence Completion", duration: "16:45", completed: false, order: 6 },
    { id: "r-07", title: "Summary Completion", duration: "20:15", completed: false, order: 7 },
    { id: "r-08", title: "Reading Practice Test", duration: "60:00", completed: false, order: 8 },
  ];

  return (
    <CourseList 
      title="IELTS Reading" 
      description="Improve your reading speed, comprehension, and accuracy for Academic and General Training."
      lessons={lessons} 
    />
  );
}
