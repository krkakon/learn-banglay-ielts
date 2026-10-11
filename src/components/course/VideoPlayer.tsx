"use client";

import { useState, useRef } from "react";
import { 
  Film, 
  ExternalLink, 
  Loader2, 
  Play,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  Maximize2,
  RotateCw
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
  const [playerMode, setPlayerMode] = useState<"gdrive" | "youtubeDemo">("gdrive");
  const containerRef = useRef<HTMLDivElement>(null);
  
  const parsed = parseVideoUrl(url);

  // If user toggles YouTube demo mode to compare
  const isActualYoutube = parsed.type === "youtube";
  const currentEmbedUrl = playerMode === "youtubeDemo" 
    ? "https://www.youtube.com/embed/S2C_S78xVjM?autoplay=0&rel=0&modestbranding=1&playsinline=1"
    : parsed.embedUrl;

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if ((containerRef.current as any).webkitRequestFullscreen) {
        (containerRef.current as any).webkitRequestFullscreen();
      }
    }
  };

  if (parsed.type === "empty" || !parsed.embedUrl) {
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
      {/* Top Player Switcher Strip (Only shown when original link is Google Drive, allowing direct comparison) */}
      {!isActualYoutube && (
        <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 p-2 bg-muted/60 rounded-xl border border-border">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => {
                setPlayerMode("gdrive");
                setLoading(true);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                playerMode === "gdrive"
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Google Drive Stream
            </button>
            <button
              onClick={() => {
                setPlayerMode("youtubeDemo");
                setLoading(true);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                playerMode === "youtubeDemo"
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Sparkles className="h-3 w-3" />
              Test YouTube Player (Smooth & No Popup)
            </button>
          </div>

          {parsed.rawDriveUrl && (
            <a
              href={parsed.rawDriveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline self-end xs:self-auto"
            >
              <ExternalLink className="h-3 w-3" />
              Drive App
            </a>
          )}
        </div>
      )}

      {/* Responsive Video Container (Strict 16:9 Widescreen Ratio prevents stretching) */}
      <div 
        ref={containerRef}
        className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-800 ring-1 ring-white/10"
      >
        {/* Loading Spinner */}
        {loading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950 text-slate-400 pointer-events-none">
            <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
            <p className="text-xs font-medium text-slate-300">Loading Video Player...</p>
          </div>
        )}

        {/* Video Embed */}
        <iframe
          key={currentEmbedUrl}
          src={currentEmbedUrl}
          title={title || "IELTS Course Video"}
          className="w-full h-full border-0 absolute inset-0 block"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowFullScreen
          loading="eager"
          onLoad={() => setLoading(false)}
        />
      </div>

      {/* Mobile Actions Bar */}
      {playerMode === "gdrive" ? (
        <div className="space-y-2.5">
          {/* Quick Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {parsed.rawDriveUrl && (
              <a
                href={parsed.rawDriveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-primary/20 transition-colors"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                Watch in Google Drive App (Native 1080p)
              </a>
            )}

            <Button
              type="button"
              variant="outline"
              onClick={handleFullscreen}
              className="h-10 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              Maximize Fullscreen
            </Button>
          </div>

          {/* Explanation Box for Google Drive Mobile Embed Quirks */}
          <div className="bg-muted/40 border border-border rounded-xl p-3.5 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-foreground">
              <HelpCircle className="h-4 w-4 text-primary shrink-0" />
              <span>মোবাইলে ভিডিও দেখার সেরা উপায় (Important Notice):</span>
            </div>
            
            <ul className="list-disc list-inside space-y-1.5 text-[11px] sm:text-xs text-muted-foreground leading-relaxed pl-1">
              <li>
                <strong>কেন ৪:৪৬ পপ-আপ আটকে থাকে?</strong> গুগল ড্রাইভের ওয়েব প্লেয়ার মাউস ব্যবহারের জন্য তৈরি। মোবাইলে টাইমলাইনে আঙুল স্পর্শ করলে প্রিভিউ পপ-আপ আসে এবং মাউস কার্সার না থাকায় তা আটকে থাকে।
              </li>
              <li>
                <strong>মাখনের মতো স্মুথলি দেখতে:</strong> উপরের <strong className="text-foreground">&quot;Watch in Google Drive App&quot;</strong> বাটনে চাপ দিন — সরাসরি ফোনে ইন্সটল থাকা গুগল ড্রাইভ অ্যাপে ফুল এইচডিতে ওপেন হবে যেখানে কোনো পপআপ বা বাটন বাধার সৃষ্টি করবে না।
              </li>
              <li>
                <strong>স্ক্রিন বড় করতে:</strong> ফোনটি আড়াআড়ি (Landscape) ঘুরিয়ে নিন অথবা <strong className="text-foreground">&quot;Maximize Fullscreen&quot;</strong> বাটনে চাপ দিন।
              </li>
              <li>
                <strong>ইউটিউব প্লেয়ার টেস্ট:</strong> উপরে লাল <strong className="text-red-500">&quot;Test YouTube Player&quot;</strong> বাটনে ট্যাপ করে দেখুন ইউটিউবে ভিডিও প্লেয়ার কতটা প্রিমিয়াম ও স্মুথ কাজ করে।
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3.5 text-xs flex items-center gap-2.5 text-green-900 dark:text-green-200">
          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
          <div className="space-y-0.5">
            <strong className="text-green-800 dark:text-green-300 block">ইউটিউব প্লেয়ারের সুবিধা (YouTube Unlisted Mode):</strong>
            <p className="text-[11px] sm:text-xs text-green-700 dark:text-green-300/80 leading-relaxed">
              মোবাইল ফোনে কোনো টাইমলাইন পপআপ আটকে থাকে না, স্ক্রিনে ট্যাপের ২ সেকেন্ড পর সকল কন্ট্রোল নিজে থেকেই লুকিয়ে যায়, ১০ সেকেন্ড ডাবল-ট্যাপ স্কিপ কাজ করে এবং বাফারিং ছাড়া মাখনের মতো চলে!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
