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
    description: "Master Skimming & Scanning, True/False/Not Given, Gap Fills, and time management strategies for 60 minutes.",
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
 * Course lessons catalog with Google Drive stream video integration.
 */
export const initialLessons: Lesson[] = [
  // ==================== IELTS READING MODULE ====================
  {
    id: "reading-01",
    moduleId: "reading",
    moduleName: "IELTS Reading",
    order: 1,
    title: "Nutmeg Gap Fill",
    banglaTitle: "নাটমেগ প্যাসেজ গ্যাপ ফিলিং স্ট্র্যাটেজি",
    description: "Detailed walkthrough of the famous Cambridge IELTS 'The Nutmeg Tree' reading passage. Learn how to locate keywords, identify word limits, and solve summary gap-fill questions accurately.",
    videoUrl: "https://drive.google.com/file/d/1oTv3XK78KudsrkclG3WowGVco-ys11UQ/view?usp=sharing",
    duration: "22:40",
    completed: false,
    keyPoints: [
      "Locating keywords and synonyms in Cambridge passage text",
      "Grammar prediction before filling the gaps (noun, verb, adjective)",
      "Avoiding common traps and strictly adhering to word count limits",
    ],
  },
  {
    id: "reading-02",
    moduleId: "reading",
    moduleName: "IELTS Reading",
    order: 2,
    title: "Gap Fill Tips & Tricks",
    banglaTitle: "গ্যাপ ফিল শর্টকাট টিপস ও ট্রিকস",
    description: "Master proven strategies and shortcuts for IELTS Reading Gap Fill questions. Learn how to skim effectively, track chronological order in passages, and never lose easy marks.",
    videoUrl: "https://drive.google.com/file/d/1CW_sa-lQrvz_RzEJJOXTmwPct9ALA4Jo/view?usp=sharing",
    duration: "18:15",
    completed: false,
    keyPoints: [
      "Chronological flow vs. scrambled sentence completion",
      "Synonym mapping and paraphrasing identification",
      "Fast skimming techniques to save critical exam minutes",
    ],
  },
  {
    id: "reading-03",
    moduleId: "reading",
    moduleName: "IELTS Reading",
    order: 3,
    title: "Gap Fill Hard Passage Analysis",
    banglaTitle: "কঠিন প্যাসেজ অ্যানালাইসিস ও সলভিং মেথড",
    description: "In-depth breakdown of complex, high-difficulty academic reading passages with dense vocabulary, abstract concepts, and subtle answer placement.",
    videoUrl: "", // Pending URL from user
    duration: "20:00",
    completed: false,
    keyPoints: [
      "Handling unfamiliar scientific and historical terminology",
      "Analyzing context clues around blank spaces",
      "Double-checking answers against grammatical coherence",
    ],
  },
  {
    id: "reading-04",
    moduleId: "reading",
    moduleName: "IELTS Reading",
    order: 4,
    title: "What Need to Write First",
    banglaTitle: "পরীক্ষার হলে কোন প্রশ্ন আগে অ্যান্সার করবেন",
    description: "Essential exam-day strategy and question sequence prioritization. Understand which questions to tackle first to maximize your score within the strict 60-minute limit.",
    videoUrl: "https://drive.google.com/file/d/1AU9e82TNcgTsbxBu6DKKOJ-Mq3LwTldc/view?usp=sharing",
    duration: "16:50",
    completed: false,
    keyPoints: [
      "Time allocation formula for 3 reading passages (15-20-25 rule)",
      "Strategic order: Which question types to answer first vs. last",
      "Direct answer sheet transfer habits to prevent missed answers",
    ],
  },
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
