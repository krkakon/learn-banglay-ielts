"use client";

import { useState } from "react";
import { PlayCircle, AlertCircle, Maximize2, ShieldCheck, Film } from "lucide-react";

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
} {
  if (!rawUrl || !rawUrl.trim()) {
    return { type: "empty", embedUrl: "" };
  }

  const url = rawUrl.trim();

  // 1. Google Drive Link:
  // Examples:
  // - https://drive.google.com/file/d/1XyZABC123/view?usp=sharing
  // - https://drive.google.com/open?id=1XyZABC123
  // - https://drive.google.com/uc?id=1XyZABC123
  // - https://drive.google.com/file/d/1XyZABC123/preview
  const gdriveRegex = /(?:drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=))([a-zA-Z0-9_-]+)/;
  const gdriveMatch = url.match(gdriveRegex);
  if (gdriveMatch && gdriveMatch[1]) {
    return {
      type: "gdrive",
      embedUrl: `https://drive.google.com/file/d/${gdriveMatch[1]}/preview`,
    };
  }

  // 2. YouTube Link:
  // Examples:
  // - https://www.youtube.com/watch?v=dQw4w9WgXcQ
  // - https://youtu.be/dQw4w9WgXcQ
  // - https://www.youtube.com/embed/dQw4w9WgXcQ
  // - https://www.youtube.com/shorts/dQw4w9WgXcQ
  const ytRegex = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const ytMatch = url.match(ytRegex);
  if (ytMatch && ytMatch[1]) {
    return {
      type: "youtube",
      embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0&rel=0&modestbranding=1`,
    };
  }

  // 3. Vimeo Link:
  const vimeoRegex = /vimeo\.com\/(?:video\/)?([0-9]+)/;
  const vimeoMatch = url.match(vimeoRegex);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      type: "vimeo",
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
    };
  }

  // 4. Direct video file (mp4, webm, ogg, m4v)
  if (url.match(/\.(mp4|webm|ogg|m4v)(\?.*)?$/i)) {
    return {
      type: "direct",
      embedUrl: url,
    };
  }

  // Fallback: If it's already an embed link or other web link
  return {
    type: "direct",
    embedUrl: url,
  };
}

export function VideoPlayer({ url, title, poster }: VideoPlayerProps) {
  const [loading, setLoading] = useState(true);
  const { type, embedUrl } = parseVideoUrl(url);

  if (type === "empty" || !embedUrl) {
    return (
      <div className="aspect-video w-full rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-8 text-center text-slate-400 shadow-xl">
        <Film className="h-16 w-16 text-slate-600 mb-3 animate-pulse" />
        <h3 className="text-lg font-semibold text-slate-200">Video Lesson Preparing</h3>
        <p className="text-sm text-slate-400 max-w-md mt-1">
          The video lecture for &ldquo;{title || "this lesson"}&rdquo; will be available shortly once uploaded by the instructor.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-800">
        {/* Source Badge */}
        <div className="absolute top-3 right-3 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/70 backdrop-blur-md text-white border border-white/10 shadow-sm">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            {type === "gdrive" ? "Google Drive HD" : type === "youtube" ? "YouTube Stream" : "Private Player"}
          </span>
        </div>

        {/* Google Drive / YouTube / Vimeo Iframe Player */}
        {(type === "gdrive" || type === "youtube" || type === "vimeo") ? (
          <iframe
            src={embedUrl}
            title={title || "IELTS Course Video"}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            allowFullScreen
          />
        ) : (
          /* Direct HTML5 Video Player */
          <video
            src={embedUrl}
            controls
            controlsList="nodownload"
            poster={poster}
            className="w-full h-full object-contain"
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {type === "gdrive" && (
        <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
          <span className="flex items-center gap-1">
            💡 <strong>Tip:</strong> Tap the <Maximize2 className="inline h-3 w-3" /> fullscreen icon on the player for the optimal viewing experience.
          </span>
          <span className="hidden sm:inline text-slate-400">1080p HD Streaming</span>
        </div>
      )}
    </div>
  );
}
