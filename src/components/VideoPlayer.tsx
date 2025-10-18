import { useRef, useState } from "react";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

export default function VideoPlayer({ src, poster, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }

    setIsPlaying(!isPlaying);
  }

  return (
    <div
      className={`relative h-full flex items-center justify-center bg-black rounded-xl overflow-hidden ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
      />
      <button
        onClick={togglePlay}
        className="absolute bg-white/80 hover:bg-white text-black rounded-full p-4 transition-all duration-200"
      >
        {isPlaying ? "❚❚" : "▶"}
      </button>
    </div>
  );
}
