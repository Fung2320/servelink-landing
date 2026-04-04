"use client";

import { useEffect, useRef } from "react";

interface VideoModalProps {
  src: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ src, isOpen, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-sm w-full rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center text-lg font-bold hover:bg-black/70 transition-colors"
        >
          &times;
        </button>
        <video
          ref={videoRef}
          src={src}
          className="w-full rounded-2xl"
          controls
          muted
          playsInline
          preload="metadata"
        />
      </div>
    </div>
  );
}
