"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Maximize2, 
  ShieldCheck, 
  Film, 
  ExternalLink, 
  Loader2, 
  Smartphone,
  Play,
  X,
  Tv,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoPlayerProps {
  url?: string;
  title?: string;
  poster?: string;
}

/**
 * Parses any video URL (Google Drive, YouTube, Vimeo, or direct MP4/WebM)
 * and returns the appropriate embed/stream URL and player type.
 */
export function parseVideoUrl(rawUrl?: string): {
  type: "gdrive" | "youtube" | "vimeo" | "direct" | "empty";
  embedUrl: string;
  rawDriveUrl: string;
} {
  if (!rawUrl || !rawUrl.trim()) {
    return { type: "empty", embedUrl: "", rawDriveUrl: "" };
  }

  const url = rawUrl.trim();

  // 1. Google Drive Link:
  const gdriveRegex = /(?:drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=))([a-zA-Z0-9_-]+)/;
  const gdriveMatch = url.match(gdriveRegex);
  if (gdriveMatch && gdriveMatch[1]) {
    const fileId = gdriveMatch[1];
    return {
      type: "gdrive",
      embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
      rawDriveUrl: `https://drive.google.com/file/d/${fileId}/view?usp=sharing`,
    };
  }

  // 2. YouTube Link:
  const ytRegex = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const ytMatch = url.match(ytRegex);
  if (ytMatch && ytMatch[1]) {
    return {
      type: "youtube",
      embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0&rel=0&modestbranding=1&playsinline=1`,
      rawDriveUrl: "",
    };
  }

  // 3. Vimeo Link:
  const vimeoRegex = /vimeo\.com\/(?:video\/)?([0-9]+)/;
  const vimeoMatch = url.match(vimeoRegex);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      type: "vimeo",
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?playsinline=1`,
      rawDriveUrl: "",
    };
  }

  // 4. Direct video file (mp4, webm, ogg, m4v)
  if (url.match(/\.(mp4|webm|ogg|m4v)(\?.*)?$/i)) {
    return {
      type: "direct",
      embedUrl: url,
      rawDriveUrl: "",
    };
  }

  // Fallback
  return {
    type: "direct",
    embedUrl: url,
    rawDriveUrl: "",
  };
}

export function VideoPlayer({ url, title, poster }: VideoPlayerProps) {
  const [loading, setLoading] = useState(true);
  const [cinemaMode, setCinemaMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { type, embedUrl, rawDriveUrl } = parseVideoUrl(url);

  // Close cinema mode on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCinemaMode(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (type === "empty" || !embedUrl) {
    return (
      <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 flex flex-col items-center justify-center p-6 text-center text-slate-400 shadow-xl overflow-hidden">
        <div className="h-14 w-14 rounded-full bg-slate-800/80 flex items-center justify-center mb-3 text-slate-500 shadow-inner">
          <Film className="h-7 w-7 text-primary/70 animate-pulse" />
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-slate-200">Video Lesson Preparing</h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-sm mt-1">
          The video lecture for &ldquo;{title || "this lesson"}&rdquo; will be available shortly once uploaded.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Top Meta Strip */}
      <div className="flex items-center justify-between text-xs px-1">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-primary/10 text-primary border border-primary/20">
            <ShieldCheck className="h-3 w-3" />
            {type === "gdrive" ? "Google Drive HD" : type === "youtube" ? "YouTube Stream" : "Private Stream"}
          </span>
          <span className="text-muted-foreground text-[11px] hidden xs:inline">1080p Stream</span>
        </div>

        {rawDriveUrl && (
          <a
            href={rawDriveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
          >
            <ExternalLink className="h-3 w-3" />
            Open in Drive App
          </a>
        )}
      </div>

      {/* Responsive 16:9 Video Player Container (True 16:9 prevents internal black letterboxes) */}
      <div 
        ref={containerRef}
        className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-800 ring-1 ring-white/10"
      >
        {/* Shimmer Loading Skeleton */}
        {loading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950 text-slate-400 pointer-events-none">
            <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
            <p className="text-xs font-medium text-slate-300">Connecting Video Stream...</p>
          </div>
        )}

        {/* Video Embed */}
        {(type === "gdrive" || type === "youtube" || type === "vimeo") ? (
          <iframe
            src={embedUrl}
            title={title || "IELTS Course Video"}
            className="w-full h-full border-0 absolute inset-0 block"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            allowFullScreen
            loading="eager"
            onLoad={() => setLoading(false)}
          />
        ) : (
          <video
            src={embedUrl}
            controls
            playsInline
            controlsList="nodownload"
            poster={poster}
            className="w-full h-full object-contain"
            onLoadedData={() => setLoading(false)}
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* Prominent Mobile Control & Cinema Bar */}
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          {/* Cinema Fullscreen Button */}
          <Button
            type="button"
            onClick={() => setCinemaMode(true)}
            className="w-full h-10 bg-primary hover:bg-primary/90 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-primary/20"
          >
            <Maximize2 className="h-4 w-4" />
            ⛶ Cinema Fullscreen
          </Button>

          {/* Watch in Drive App Button */}
          {rawDriveUrl ? (
            <a
              href={rawDriveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-10 rounded-lg border border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Watch in Drive App
            </a>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (containerRef.current?.requestFullscreen) {
                  containerRef.current.requestFullscreen();
                }
              }}
              className="w-full h-10 text-xs sm:text-sm"
            >
              <Tv className="h-4 w-4 mr-1.5" /> Fullscreen
            </Button>
          )}
        </div>

        {/* Clear Touch Control Guide for Students */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-xs space-y-1.5 text-amber-900 dark:text-amber-200">
          <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300">
            <HelpCircle className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <span>মোবাইলে সহজে ভিডিও কন্ট্রোল করার নিয়ম (Mobile Controls Guide):</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-[11px] sm:text-xs text-muted-foreground leading-relaxed pl-1">
            <li><strong>প্লে / পজ করতে:</strong> ভিডিও স্ক্রিনে যেকোনো জায়গায় একবার টাচ করুন (Tap on video to Play/Pause).</li>
            <li><strong>ক্লিয়ার ফুলস্ক্রিন দেখতে:</strong> উপরের লাল <strong>&quot;Cinema Fullscreen&quot;</strong> বাটনে চাপ দিন অথবা ফোনটি আড়াআড়ি (Landscape) ঘুরিয়ে নিন।</li>
            <li><strong>স্পিড বাড়াতে বা ফাস্ট দেখতে:</strong> <strong>&quot;Watch in Drive App&quot;</strong> বাটনে চাপলে সরাসরি গুগল ড্রাইভে ফুল এইচডিতে ওপেন হবে।</li>
          </ul>
        </div>
      </div>

      {/* Dedicated Cinema Mode Modal (Full Viewport for Mobile Phones) */}
      {cinemaMode && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col animate-in fade-in">
          {/* Header Bar */}
          <div className="h-12 flex items-center justify-between px-4 bg-slate-950 border-b border-slate-800 text-white z-20 shrink-0">
            <div className="flex items-center gap-2 truncate pr-2">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse shrink-0" />
              <span className="text-xs sm:text-sm font-bold truncate">{title || "IELTS Video Lecture"}</span>
            </div>
            <button
              onClick={() => setCinemaMode(false)}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1 shrink-0"
            >
              <X className="h-4 w-4" />
              Close Cinema View
            </button>
          </div>

          {/* Fullscreen Video Body */}
          <div className="flex-1 w-full h-full relative bg-black">
            <iframe
              src={embedUrl}
              title={title || "IELTS Course Video"}
              className="w-full h-full border-0 absolute inset-0 block"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
