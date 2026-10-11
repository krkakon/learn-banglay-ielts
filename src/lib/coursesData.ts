export interface Lesson {
  id: string;
  moduleId: "listening" | "reading" | "writing" | "speaking";
  moduleName: string;
  order: number;
  title: string;
  banglaTitle?: string;
  description: string;
  videoUrl: string; // Accepts Google Drive, YouTube, Vimeo, or MP4 link
  duration: string;
  completed?: boolean;
  keyPoints?: string[];
  resources?: Array<{ title: string; url: string }>;
}

export interface ModuleInfo {
  id: "listening" | "reading" | "writing" | "speaking";
  name: string;
  banglaName: string;
  description: string;
  color: string;
  badgeColor: string;
  href: string;
}

export const MODULES_INFO: Record<string, ModuleInfo> = {
  listening: {
    id: "listening",
    name: "IELTS Listening",
    banglaName: "লিসেনিং প্রস্তুতি",
    description: "Master all 4 sections with British & Australian accent training, multiple-choice tactics, and map/diagram strategies.",
    color: "bg-blue-500",
    badgeColor: "text-blue-500 bg-blue-50",
    href: "/listening",
  },
  reading: {
    id: "reading",
    name: "IELTS Reading",
    banglaName: "রিডিং প্রস্তুতি",
    description: "Master Skimming & Scanning, True/False/Not Given, Heading Matching, and time management strategies for 60 minutes.",
    color: "bg-green-500",
    badgeColor: "text-green-500 bg-green-50",
    href: "/reading",
  },
  writing: {
    id: "writing",
    name: "IELTS Writing",
    banglaName: "রাইটিং প্রস্তুতি",
    description: "Step-by-step masterclasses for Task 1 (Charts, Graphs, Maps) and Task 2 (Opinion, Discussion essays) targeting Band 7+.",
    color: "bg-purple-500",
    badgeColor: "text-purple-500 bg-purple-50",
    href: "/writing",
  },
  speaking: {
    id: "speaking",
    name: "IELTS Speaking",
    banglaName: "স্পিকিং প্রস্তুতি",
    description: "Fluency development, Cue Card structures for Part 2, and high-scoring vocabulary and discussion techniques for Part 3.",
    color: "bg-orange-500",
    badgeColor: "text-orange-500 bg-orange-50",
    href: "/speaking",
  },
};

/**
 * Initial course lessons catalog.
 * When the user shares Google Drive links, simply add or update the entries here!
 */
export const initialLessons: Lesson[] = [
  // Listening Lessons (ready to be populated)
  // Reading Lessons (ready to be populated)
  // Writing Lessons (ready to be populated)
  // Speaking Lessons (ready to be populated)
];

export function getLessonsByModule(moduleId: string): Lesson[] {
  return initialLessons
    .filter((l) => l.moduleId === moduleId)
    .sort((a, b) => a.order - b.order);
}

export function getLessonById(id: string): Lesson | undefined {
  return initialLessons.find((l) => l.id === id);
}

export function getAllLessons(): Lesson[] {
  return initialLessons;
}

export function getModuleStats() {
  const stats = {
    listening: { total: 0, completed: 0, percentage: 0 },
    reading: { total: 0, completed: 0, percentage: 0 },
    writing: { total: 0, completed: 0, percentage: 0 },
    speaking: { total: 0, completed: 0, percentage: 0 },
  };

  initialLessons.forEach((lesson) => {
    if (stats[lesson.moduleId]) {
      stats[lesson.moduleId].total += 1;
      if (lesson.completed) {
        stats[lesson.moduleId].completed += 1;
      }
    }
  });

  (Object.keys(stats) as Array<keyof typeof stats>).forEach((key) => {
    const mod = stats[key];
    mod.percentage = mod.total > 0 ? Math.round((mod.completed / mod.total) * 100) : 0;
  });

  return stats;
}

export function getAdjacentLessons(lessonId: string): {
  prev: Lesson | null;
  next: Lesson | null;
  moduleLessons: Lesson[];
} {
  const current = getLessonById(lessonId);
  if (!current) {
    return { prev: null, next: null, moduleLessons: [] };
  }

  const moduleLessons = getLessonsByModule(current.moduleId);
  const currentIndex = moduleLessons.findIndex((l) => l.id === lessonId);

  return {
    prev: currentIndex > 0 ? moduleLessons[currentIndex - 1] : null,
    next: currentIndex < moduleLessons.length - 1 ? moduleLessons[currentIndex + 1] : null,
    moduleLessons,
  };
}
