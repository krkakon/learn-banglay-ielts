"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Trash2,
  ExternalLink,
  X,
  Sparkles,
  Link as LinkIcon
} from "lucide-react";
import Link from "next/link";
import { initialLessons, Lesson, MODULES_INFO } from "@/lib/coursesData";

export default function AdminCoursesPage() {
  const [selectedModule, setSelectedModule] = useState<"listening" | "reading" | "writing" | "speaking">("listening");
  const [lessonsList, setLessonsList] = useState<Lesson[]>(initialLessons);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [formModule, setFormModule] = useState<"listening" | "reading" | "writing" | "speaking">("listening");
  const [formTitle, setFormTitle] = useState("");
  const [formVideoUrl, setFormVideoUrl] = useState("");
  const [formDuration, setFormDuration] = useState("20:00");
  const [formDescription, setFormDescription] = useState("");

  const modules = [
    { id: "listening" as const, name: "IELTS Listening", icon: Headphones, color: "text-blue-500", bg: "bg-blue-50" },
    { id: "reading" as const, name: "IELTS Reading", icon: BookOpen, color: "text-green-500", bg: "bg-green-50" },
    { id: "writing" as const, name: "IELTS Writing", icon: PenTool, color: "text-purple-500", bg: "bg-purple-50" },
    { id: "speaking" as const, name: "IELTS Speaking", icon: Mic, color: "text-orange-500", bg: "bg-orange-50" },
  ];

  const currentLessons = lessonsList.filter((l) => l.moduleId === selectedModule);

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const newLesson: Lesson = {
      id: `${formModule}-${Date.now().toString().slice(-4)}`,
      moduleId: formModule,
      moduleName: MODULES_INFO[formModule]?.name || "IELTS Module",
      order: currentLessons.length + 1,
      title: formTitle.trim(),
      description: formDescription.trim() || `Comprehensive masterclass on ${formTitle.trim()} for IELTS exam preparation.`,
      videoUrl: formVideoUrl.trim(),
      duration: formDuration.trim() || "15:00",
      completed: false,
    };

    setLessonsList((prev) => [...prev, newLesson]);
    setShowAddModal(false);
    setSelectedModule(formModule);

    // Reset Form
    setFormTitle("");
    setFormVideoUrl("");
    setFormDuration("20:00");
    setFormDescription("");
  };

  const handleDeleteLesson = (id: string) => {
    if (confirm("Are you sure you want to delete this lesson?")) {
      setLessonsList((prev) => prev.filter((l) => l.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Modules & Video Lessons</h1>
          <p className="text-slate-500 mt-1">Manage private video lessons and course curriculum with Google Drive stream support.</p>
        </div>
        <Button 
          onClick={() => {
            setFormModule(selectedModule);
            setShowAddModal(true);
          }}
          className="bg-primary hover:bg-primary/90 text-white font-medium flex items-center shadow-md shadow-primary/20"
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Video Lesson
        </Button>
      </div>

      {/* Module Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {modules.map((mod) => {
          const isSelected = selectedModule === mod.id;
          const count = lessonsList.filter((l) => l.moduleId === mod.id).length;
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
                  <p className="text-xs text-slate-500 mt-0.5">{count} Lessons</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Lessons Table */}
      <Card className="border-slate-200 shadow-sm bg-white">
        <CardHeader className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <CardTitle className="text-lg capitalize">
              {modules.find((m) => m.id === selectedModule)?.name} Curriculum
            </CardTitle>
            <CardDescription>All video lessons currently available to enrolled students.</CardDescription>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full">
            {currentLessons.length} Total Lessons
          </span>
        </CardHeader>
        <CardContent className="p-0">
          {currentLessons.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <Video className="h-12 w-12 mx-auto text-slate-300 mb-3" />
              <h3 className="text-base font-semibold text-slate-800">No lessons in this module yet</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1">
                You can add Google Drive or YouTube links directly to populate this section.
              </p>
              <Button 
                onClick={() => {
                  setFormModule(selectedModule);
                  setShowAddModal(true);
                }}
                className="mt-4 bg-primary hover:bg-primary/90 text-white font-medium" 
                size="sm"
              >
                <Plus className="mr-2 h-4 w-4" /> Add First Lesson
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                  <tr>
                    <th className="px-5 py-3">Order</th>
                    <th className="px-5 py-3">Lesson Title</th>
                    <th className="px-5 py-3">Duration</th>
                    <th className="px-5 py-3">Video Link</th>
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
                      <td className="px-5 py-4 text-xs text-slate-600">
                        <span className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1 text-slate-400" /> {lesson.duration}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {lesson.videoUrl ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                            <LinkIcon className="h-3 w-3 mr-1" /> Linked
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-700">
                            Pending URL
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/lesson/${lesson.id}`} target="_blank">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-500 hover:text-slate-800" title="Preview Student Player">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700" 
                            onClick={() => handleDeleteLesson(lesson.id)}
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add New Lesson Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold text-slate-900">Add New Video Lesson</h3>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddLesson} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="module">Target Module</Label>
                <select 
                  id="module"
                  value={formModule}
                  onChange={(e) => setFormModule(e.target.value as any)}
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                >
                  <option value="listening">IELTS Listening</option>
                  <option value="reading">IELTS Reading</option>
                  <option value="writing">IELTS Writing</option>
                  <option value="speaking">IELTS Speaking</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="title">Lesson Title / Topic</Label>
                <Input 
                  id="title"
                  placeholder="e.g. Section 1: Note Completion & Traps"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="videoUrl">Google Drive or YouTube Link</Label>
                <Input 
                  id="videoUrl"
                  placeholder="https://drive.google.com/file/d/... or YouTube URL"
                  value={formVideoUrl}
                  onChange={(e) => setFormVideoUrl(e.target.value)}
                />
                <p className="text-[11px] text-slate-400">
                  Tip: For Google Drive, ensure link sharing is set to &quot;Anyone with the link can view&quot;.
                </p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="duration">Estimated Duration</Label>
                <Input 
                  id="duration"
                  placeholder="e.g. 25:30"
                  value={formDuration}
                  onChange={(e) => setFormDuration(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="description">Lesson Overview (Optional)</Label>
                <textarea 
                  id="description"
                  rows={3}
                  placeholder="Describe key points taught in this video lecture..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full p-3 border rounded-lg text-sm resize-none focus:outline-primary"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">
                  Save Lesson
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
