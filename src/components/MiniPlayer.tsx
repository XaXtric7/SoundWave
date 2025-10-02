import { useMemo } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Maximize2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayer } from "@/contexts/PlayerContext";

export function MiniPlayer() {
  const {
    currentTrack,
    isPlaying,
    progressSeconds,
    durationSeconds,
    play,
    pause,
    seek,
    expand,
    close,
  } = usePlayer();
  const progressPercent = useMemo(() => {
    if (!durationSeconds) return 0;
    return Math.min(
      100,
      Math.max(0, (progressSeconds / durationSeconds) * 100)
    );
  }, [progressSeconds, durationSeconds]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border h-16 px-4 flex items-center z-50 shadow-lg">
      {/* Track Info */}
      <div className="flex items-center flex-1 min-w-0">
        <div className="h-10 w-10 rounded bg-primary/20 mr-3 flex-shrink-0 overflow-hidden">
          {currentTrack && (
            <img
              src={currentTrack.coverUrl}
              alt={`${currentTrack.title} cover`}
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <div className="min-w-0 mr-2">
          <div className="font-medium text-sm truncate">
            {currentTrack?.title ?? ""}
          </div>
          <div className="text-xs text-muted-foreground truncate">
            {currentTrack?.artist ?? ""}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1 md:gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <Shuffle className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={isPlaying ? pause : play}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <SkipForward className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <Repeat className="h-4 w-4" />
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="flex-1 mx-4 hidden md:block">
        <div className="flex items-center">
          <span className="text-xs text-muted-foreground w-9 text-right">
            {formatTime(progressSeconds)}
          </span>
          <div className="mx-2 flex-1">
            <Slider
              value={[progressPercent]}
              max={100}
              step={1}
              onValueChange={(value) => {
                const pct = value[0] / 100;
                seek(pct * (durationSeconds || 0));
              }}
              className="cursor-pointer"
            />
          </div>
          <span className="text-xs text-muted-foreground w-9">
            {formatTime(durationSeconds)}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={expand}
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={close}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function formatTime(totalSeconds: number) {
  if (!totalSeconds || !isFinite(totalSeconds)) return "0:00";
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
