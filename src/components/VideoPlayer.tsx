import { useRef, useState, useEffect } from "react";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

export default function VideoPlayer({ src, poster, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(false);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play()
        .catch(err => {
          console.error("Error playing video:", err);
          // Handle autoplay restrictions
          setIsPlaying(false);
        });
      setHasStarted(true);
    }

    setIsPlaying(!isPlaying);
    // Show controls briefly after toggling play/pause
    setShowControls(true);
    setTimeout(() => setShowControls(false), 3000);
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }

  function updateProgress() {
    const video = videoRef.current;
    if (!video) return;
    
    const progress = (video.currentTime / video.duration) * 100;
    setProgress(progress);
  }

  function handleProgressClick(e: React.MouseEvent<HTMLDivElement>) {
    const video = videoRef.current;
    const progressBar = e.currentTarget;
    if (!video || !progressBar) return;
    
    const pos = (e.nativeEvent.offsetX / progressBar.offsetWidth);
    video.currentTime = pos * video.duration;
  }

  function handleScreenTap(e: React.MouseEvent) {
    // Prevent event bubbling to avoid double-triggering
    e.stopPropagation();
    
    // Only toggle play if we're not clicking on a control
    const target = e.target as HTMLElement;
    if (!target.closest('button') && !target.closest('.progress-bar')) {
      togglePlay();
    }
  }

  // Update progress bar as video plays
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setHasStarted(false);
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('ended', handleEnded);
    
    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative h-full flex flex-col items-center justify-center bg-black rounded-xl overflow-hidden ${className} ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}
      onClick={handleScreenTap}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-contain"
        // Remove onClick from video element to prevent double triggering
      />
      
      {/* Initial Play Button Overlay */}
      {!hasStarted && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
        >
          <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-all">
            <div className="w-0 h-0 border-y-[15px] border-y-transparent border-l-[26px] border-l-white ml-2"></div>
          </div>
        </div>
      )}

      {/* Play/Pause feedback indicator */}
      {hasStarted && (
        <div 
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="bg-black/40 rounded-full p-8 backdrop-blur-sm">
            {isPlaying ? 
              <div className="flex gap-2">
                <div className="w-5 h-14 bg-white"></div>
                <div className="w-5 h-14 bg-white"></div>
              </div> : 
              <div className="w-0 h-0 border-y-[20px] border-y-transparent border-l-[35px] border-l-white ml-2"></div>
            }
          </div>
        </div>
      )}
      
      {/* Video Controls */}
      <div className={`absolute bottom-0 left-0 right-0 bg-black/50 p-2 flex flex-col transition-opacity duration-300 ${showControls || isFullscreen ? 'opacity-100' : 'opacity-0 hover:opacity-100'}`}>
        {/* Progress bar */}
        <div 
          className="progress-bar w-full h-2 bg-gray-700 mb-2 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleProgressClick(e);
          }}
        >
          <div 
            className="h-full bg-white" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-between">
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="text-white px-2 py-1 hover:bg-white/20 rounded"
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFullscreen();
            }}
            className="text-white px-2 py-1 hover:bg-white/20 rounded"
          >
            {isFullscreen ? "⤓" : "⤢"}
          </button>
        </div>
      </div>
    </div>
  );
}