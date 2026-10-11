"use client";

import { useState } from "react";
import { 
  PlayCircle, 
  Maximize2, 
  ShieldCheck, 
  Film, 
  ExternalLink, 
  Loader2, 
  Smartphone,
  Sparkles
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
  const { type, embedUrl, rawDriveUrl } = parseVideoUrl(url);

  if (type === "empty" || !embedUrl) {
    return (
      <div className="relative aspect-video w-full rounded-xl sm:rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 flex flex-col items-center justify-center p-6 text-center text-slate-400 shadow-xl overflow-hidden">
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
    <div className="space-y-2.5">
      {/* Responsive Video Container with Ambient Shadow */}
      <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-800/80 ring-1 ring-white/5">
        
        {/* Shimmer Loading Skeleton */}
        {loading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950 text-slate-400">
            <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
            <p className="text-xs font-medium text-slate-300">Loading High-Definition Stream...</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Learn Banglay IELTS Player</p>
          </div>
        )}

        {/* Source Badge (Top Right) */}
        <div className="absolute top-2.5 right-2.5 z-20 pointer-events-none">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-black/80 backdrop-blur-md text-white border border-white/10 shadow-lg">
            <ShieldCheck className="h-3 w-3 text-primary" />
            {type === "gdrive" ? "Google Drive HD" : type === "youtube" ? "YouTube Stream" : "Private Stream"}
          </span>
        </div>

        {/* Google Drive / YouTube / Vimeo Iframe Player */}
        {(type === "gdrive" || type === "youtube" || type === "vimeo") ? (
          <iframe
            src={embedUrl}
            title={title || "IELTS Course Video"}
            className="w-full h-full border-0 absolute inset-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            allowFullScreen
            loading="eager"
            onLoad={() => setLoading(false)}
          />
        ) : (
          /* Direct HTML5 Video Player */
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

      {/* Mobile-Optimized Quick Action Strip */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-muted-foreground px-1 pt-0.5">
        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
          <Smartphone className="h-3.5 w-3.5 text-primary shrink-0" />
          <span className="text-[11px] sm:text-xs">
            <strong>Mobile Tip:</strong> Rotate to landscape or tap the <Maximize2 className="inline h-2.5 w-2.5 text-primary" /> fullscreen button for cinema view.
          </span>
        </div>

        {rawDriveUrl && (
          <a
            href={rawDriveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium text-primary hover:text-primary/80 transition-colors py-1 px-2 rounded-md hover:bg-primary/5 border border-primary/20 shrink-0"
          >
            <ExternalLink className="h-3 w-3" />
            Watch in Drive App (1080p)
          </a>
        )}
      </div>
    </div>
  );
}
