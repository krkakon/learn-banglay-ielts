"use client";

import { useState, useRef } from "react";
import { 
  Maximize2, 
  ShieldCheck, 
  Film, 
  ExternalLink, 
  Loader2, 
  Smartphone,
  Play,
  RotateCcw
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { type, embedUrl, rawDriveUrl } = parseVideoUrl(url);

  const handleRequestFullscreen = () => {
    if (!containerRef.current) return;
    try {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if ((containerRef.current as any).webkitRequestFullscreen) {
        (containerRef.current as any).webkitRequestFullscreen();
      }
    } catch (e) {
      console.log("Fullscreen request:", e);
    }
  };

  if (type === "empty" || !embedUrl) {
    return (
      <div className="relative w-full h-[240px] sm:h-[360px] rounded-xl sm:rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 flex flex-col items-center justify-center p-6 text-center text-slate-400 shadow-xl overflow-hidden">
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
      {/* Player Meta Strip (Above player so NOTHING blocks video controls) */}
      <div className="flex items-center justify-between text-xs px-1">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-primary/10 text-primary border border-primary/20">
            <ShieldCheck className="h-3 w-3" />
            {type === "gdrive" ? "Google Drive HD" : type === "youtube" ? "YouTube Stream" : "Private Player"}
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

      {/* Optimized Video Frame Container */}
      {/* On mobile: min-h-[250px] gives ample room for Google Drive controls bar */}
      <div 
        ref={containerRef}
        className="relative w-full h-[250px] xs:h-[280px] sm:h-[380px] md:h-[460px] lg:h-[500px] rounded-lg sm:rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-800 ring-1 ring-white/10"
      >
        {/* Loading Spinner Skeleton (Fades out when loaded) */}
        {loading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950 text-slate-400 pointer-events-none">
            <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
            <p className="text-xs font-medium text-slate-300">Connecting Video Stream...</p>
          </div>
        )}

        {/* Video Embed without ANY overlapping badges */}
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

      {/* Helpful Mobile Controls & Tips Strip */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-muted/40 p-2.5 rounded-xl border border-border/60 text-xs">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Smartphone className="h-3.5 w-3.5 text-primary shrink-0" />
          <span className="text-[11px] sm:text-xs">
            <strong>Controls Tip:</strong> Tap video once to show Play/Pause & Fullscreen buttons. Rotate phone for cinema view.
          </span>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleRequestFullscreen}
            className="h-7 text-[11px] px-2.5 gap-1 border-primary/30 text-primary hover:bg-primary/5"
          >
            <Maximize2 className="h-3 w-3" />
            Fullscreen
          </Button>

          {rawDriveUrl && (
            <a
              href={rawDriveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-medium py-1 px-2.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-7 transition-colors"
            >
              <Play className="h-2.5 w-2.5 fill-current" />
              Drive Player
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
