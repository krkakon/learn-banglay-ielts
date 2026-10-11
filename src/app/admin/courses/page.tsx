"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Headphones, 
  PenTool, 
  Mic, 
  Video, 
  PlayCircle, 
  Plus, 
  CheckCircle2, 
  Clock, 
  FileEdit,
  Trash2,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

export default function AdminCoursesPage() {
  const [selectedModule, setSelectedModule] = useState("listening");

  const modules = [
    { id: "listening", name: "IELTS Listening", icon: Headphones, color: "text-blue-500", bg: "bg-blue-50", count: 8 },
    { id: "reading", name: "IELTS Reading", icon: BookOpen, color: "text-green-500", bg: "bg-green-50", count: 8 },
    { id: "writing", name: "IELTS Writing", icon: PenTool, color: "text-purple-500", bg: "bg-purple-50", count: 8 },
    { id: "speaking", name: "IELTS Speaking", icon: Mic, color: "text-orange-500", bg: "bg-orange-50", count: 8 },
  ];

  const lessons: Record<string, Array<{ id: string; title: string; duration: string; status: string; video: string }>> = {
    listening: [
      { id: "l-01", title: "Introduction to IELTS Listening", duration: "12:30", status: "Published", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "l-02", title: "Listening Question Types", duration: "15:45", status: "Published", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "l-03", title: "Form Completion Strategies", duration: "18:20", status: "Published", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "l-04", title: "Multiple Choice Mastery", duration: "20:10", status: "Published", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "l-05", title: "Map & Diagram Labeling", duration: "22:15", status: "Published", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "l-06", title: "Sentence & Note Completion", duration: "14:50", status: "Published", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "l-07", title: "Matching Questions Breakdown", duration: "19:05", status: "Published", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "l-08", title: "Full Listening Practice Test", duration: "35:00", status: "Published", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
    ],
    reading: [
      { id: "r-01", title: "Skimming and Scanning Techniques", duration: "16:00", status: "Published", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "r-02", title: "True, False, Not Given Mastery", duration: "21:30", status: "Published", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "r-03", title: "Heading Matching Questions", duration: "18:45", status: "Published", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "r-04", title: "Summary Completion", duration: "15:10", status: "Published", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
    ],
    writing: [
      { id: "w-01", title: "Task 1: Academic Report Writing", duration: "25:00", status: "Published", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "w-02", title: "Task 2: Essay Structures & Ideas", duration: "30:15", status: "Published", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "w-03", title: "Band 9 Vocabulary & Cohesion", duration: "22:40", status: "Published", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
    ],
    speaking: [
      { id: "s-01", title: "Speaking Part 1: Fluency & Confidence", duration: "14:20", status: "Published", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "s-02", title: "Speaking Part 2: Cue Card 2-Min Talk", duration: "24:10", status: "Published", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "s-03", title: "Speaking Part 3: Abstract Discussion", duration: "19:50", status: "Published", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
    ],
  };

  const currentLessons = lessons[selectedModule] || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Modules & Video Lessons</h1>
          <p className="text-slate-500 mt-1">Manage private video lessons and course curriculum.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white font-medium flex items-center shadow-md shadow-primary/20">
          <Plus className="mr-2 h-4 w-4" /> Add New Video Lesson
        </Button>
      </div>

      {/* Module Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {modules.map((mod) => {
          const isSelected = selectedModule === mod.id;
          return (
            <Card 
              key={mod.id}
              onClick={() => setSelectedModule(mod.id)}
              className={`cursor-pointer transition-all border-2 ${
                isSelected 
                  ? "border-primary shadow-md bg-white ring-2 ring-primary/10" 
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <CardContent className="p-4 flex items-center space-x-3">
                <div className={`p-2.5 rounded-xl ${mod.bg} ${mod.color}`}>
                  <mod.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">{mod.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{mod.count} Lessons</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Lessons Table */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <CardTitle className="text-lg capitalize">
              {modules.find(m => m.id === selectedModule)?.name} Curriculum
            </CardTitle>
            <CardDescription>All video lessons currently available to enrolled students.</CardDescription>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full">
            {currentLessons.length} Total Lessons
          </span>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                <tr>
                  <th className="px-5 py-3">Order</th>
                  <th className="px-5 py-3">Lesson Title</th>
                  <th className="px-5 py-3">Duration</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentLessons.map((lesson, idx) => (
                  <tr key={lesson.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-4 font-mono text-xs text-slate-400">
                      #{idx + 1}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-slate-100 text-slate-600 rounded-lg shrink-0">
                          <PlayCircle className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{lesson.title}</p>
                          <p className="text-xs text-slate-400 font-mono">{lesson.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-600 flex items-center pt-5">
                      <Clock className="h-3.5 w-3.5 mr-1 text-slate-400" /> {lesson.duration}
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        <CheckCircle2 className="h-3 w-3 mr-1" /> {lesson.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/lesson/${lesson.id}`} target="_blank">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-500 hover:text-slate-800" title="Preview Student View">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-500 hover:text-slate-800" title="Edit Lesson">
                          <FileEdit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-700" title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
