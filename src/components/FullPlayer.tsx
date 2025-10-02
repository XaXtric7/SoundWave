import { useMemo, useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Minimize2,
  Heart,
  Volume2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePlayer } from "@/contexts/PlayerContext";

export function FullPlayer() {
  const {
    currentTrack,
    isPlaying,
    progressSeconds,
    durationSeconds,
    volume,
    play,
    pause,
    seek,
    setVolume,
    minimize,
    close,
  } = usePlayer();
  const [isLiked, setIsLiked] = useState(false);

  const togglePlay = () => (isPlaying ? pause() : play());
  const toggleLike = () => setIsLiked(!isLiked);
  const progressPercent = useMemo(() => {
    if (!durationSeconds) return 0;
    return Math.min(
      100,
      Math.max(0, (progressSeconds / durationSeconds) * 100)
    );
  }, [progressSeconds, durationSeconds]);

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Background with blur */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 dark:opacity-10"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8fDA%3D)`,
          filter: "blur(30px)",
        }}
      />

      <div className="relative z-10 flex flex-col h-full p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={minimize}
            className="h-10 w-10"
          >
            <Minimize2 className="h-5 w-5" />
          </Button>
          <h2 className="text-xl font-semibold">Now Playing</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={close}
            className="h-10 w-10"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col md:flex-row gap-8 overflow-hidden">
          {/* Album Art */}
          <div className="flex-shrink-0 w-full md:w-1/2 aspect-square max-w-md mx-auto md:mx-0">
            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl group">
              {currentTrack && (
                <img
                  src={currentTrack.coverUrl}
                  alt={`${currentTrack.title} cover`}
                  className="h-full w-full object-cover"
                />
              )}

              {/* Rotating disc animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={`w-1/3 h-1/3 rounded-full border-8 border-black/20 ${
                    isPlaying ? "animate-spin-slow" : ""
                  }`}
                >
                  <div className="w-3 h-3 bg-black/30 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Track Info and Controls */}
          <div className="flex flex-col flex-1 justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-1">
                {currentTrack?.title ?? ""}
              </h1>
              <h2 className="text-xl text-muted-foreground mb-6">
                {currentTrack?.artist ?? ""}
              </h2>

              {/* Tabs for Lyrics/Info */}
              <Tabs defaultValue="lyrics" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="lyrics">Lyrics</TabsTrigger>
                  <TabsTrigger value="info">Info</TabsTrigger>
                </TabsList>

                {/* Lyrics */}
                <TabsContent
                  value="lyrics"
                  className="h-[200px] overflow-y-auto pr-2"
                >
                  <p className="text-muted-foreground leading-relaxed text-center font-semibold">
                    Tu-tu-tu-du, Max Verstappen
                    <br />
                    Tu-tu-tu-du, Max Verstappen
                    <br />
                    Tu-tu-tu-du, Max Verstappen
                    <br />
                    Tu-tu-tu-du, Max Verstappen
                    <br />
                    <br />
                    Vijf ronden zijn er nog te gaan
                    <br />
                    D'r is geel en een crash, daar komt die safety car
                    <br />
                    Het wereldkampioenschap is omgekeerd
                    <br />
                    Hij heeft hem
                    <br />
                    Hij heeft hem (hey)
                    <br />
                    <br />
                    Hey
                    <br />
                    Hey
                    <br />
                    Tu-tu-tu-du, Max Verstappen
                    <br />
                    Tu-tu-tu-du, Max Verstappen (hey)
                    <br />
                    Tu-tu-tu-du, Max Verstappen
                    <br />
                    Tu-tu-tu-du, Max Verstappen (hey)
                    <br />
                    <br />
                    That's our dude
                    <br />
                    Simply, simply lovely
                    <br />
                    Yes! What happened?
                    <br />
                    (Protect advantage)
                    <br />
                    Yeah, here we go again
                    <br />
                    Oh my Lord, Max! Oh my fucking-
                    <br />
                    What? (You are the World Champion!) Yes!
                    <br />
                    Oh my god!
                    <br />
                    Whoa!
                    <br />
                    Max Verstappen, you are the World Champion
                    <br />
                    The World Champion (hey)
                    <br />
                    <br />
                    Hey
                    <br />
                    Hey
                    <br />
                    Tu-tu-tu-du, Max Verstappen
                    <br />
                    Tu-tu-tu-du, Max Verstappen (hey)
                    <br />
                    Tu-tu-tu-du, Max Verstappen
                    <br />
                    Tu-tu-tu-du, Max Verstappen (hey)
                    <br />
                    <br />
                    Sporteroverwinningen zijn zo mooi
                    <br />
                    En deze is
                    <br />
                    De allermooiste die ik in m'n leven gezien heb (what's
                    happening?)
                    <br />
                    "What is happening?" roepen ze hier
                    <br />
                    Sjonge jonge jonge
                    <br />
                    Straatfeest (hey)
                    <br />
                  </p>
                </TabsContent>

                {/* Info */}
                <TabsContent value="info" className="h-[200px] overflow-y-auto">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Title
                      </h3>
                      <p>Tu-Tu-Tu-Du Max Verstappen</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Artist
                      </h3>
                      <p>Fan Chant (viral Dutch remix)</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Genre
                      </h3>
                      <p>Fan Song / Meme Remix</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Released
                      </h3>
                      <p>2021 (viral after Abu Dhabi GP)</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Fun Fact
                      </h3>
                      <p>
                        Mixes Dutch commentary & fan chants with EDM beats to
                        celebrate Max’s first World Championship.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Playback Controls */}
            <div className="mt-auto">
              {/* Progress Bar */}
              <div className="flex items-center mb-4">
                <span className="text-xs text-muted-foreground w-10">
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
                <span className="text-xs text-muted-foreground w-10">
                  {formatTime(durationSeconds)}
                </span>
              </div>

              {/* Main Controls */}
              <div className="flex justify-between items-center mb-6">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 text-muted-foreground hover:text-foreground"
                  onClick={toggleLike}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isLiked ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                </Button>

                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 text-muted-foreground hover:text-foreground"
                  >
                    <Shuffle className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 text-foreground"
                  >
                    <SkipBack className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-16 w-16 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={togglePlay}
                  >
                    {isPlaying ? (
                      <Pause className="h-8 w-8" />
                    ) : (
                      <Play className="h-8 w-8 ml-1" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 text-foreground"
                  >
                    <SkipForward className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 text-muted-foreground hover:text-foreground"
                  >
                    <Repeat className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex items-center gap-2 w-24">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <Slider
                    value={[Math.round(volume * 100)]}
                    max={100}
                    step={1}
                    onValueChange={(value) => setVolume(value[0] / 100)}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
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
