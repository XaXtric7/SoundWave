import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type Track = {
  title: string;
  artist: string;
  coverUrl: string;
  src: string;
};

type PlayerContextValue = {
  currentTrack: Track | null;
  isPlaying: boolean;
  isExpanded: boolean;
  progressSeconds: number;
  durationSeconds: number;
  volume: number; // 0..1
  loadAndPlay: (track: Track) => void;
  play: () => void;
  pause: () => void;
  seek: (seconds: number) => void;
  setVolume: (value: number) => void; // 0..1
  expand: () => void;
  minimize: () => void;
  close: () => void;
};

const PlayerContext = createContext<PlayerContextValue | undefined>(undefined);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [progressSeconds, setProgressSeconds] = useState(0);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [volume, setVolumeState] = useState(0.8);

  // Create audio element once
  if (audioRef.current == null && typeof window !== "undefined") {
    audioRef.current = new Audio();
    audioRef.current.preload = "metadata";
  }

  // Attach listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setProgressSeconds(audio.currentTime || 0);
    const onDurationChange = () => setDurationSeconds(audio.duration || 0);
    const onEnded = () => setIsPlaying(false);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  // Keep audio volume in sync
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const play = useCallback(() => {
    void audioRef.current?.play();
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const seek = useCallback(
    (seconds: number) => {
      if (audioRef.current) {
        audioRef.current.currentTime = Math.max(
          0,
          Math.min(seconds, durationSeconds || seconds)
        );
      }
    },
    [durationSeconds]
  );

  const setVolume = useCallback((value: number) => {
    const clamped = Math.max(0, Math.min(1, value));
    setVolumeState(clamped);
  }, []);

  const loadAndPlay = useCallback((track: Track) => {
    setCurrentTrack(track);
    setIsExpanded(false);
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = track.src;
    audio.currentTime = 0;
    void audio.play();
  }, []);

  const expand = useCallback(() => setIsExpanded(true), []);
  const minimize = useCallback(() => setIsExpanded(false), []);
  const close = useCallback(() => {
    setCurrentTrack(null);
    setIsExpanded(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  const value = useMemo<PlayerContextValue>(
    () => ({
      currentTrack,
      isPlaying,
      isExpanded,
      progressSeconds,
      durationSeconds,
      volume,
      loadAndPlay,
      play,
      pause,
      seek,
      setVolume,
      expand,
      minimize,
      close,
    }),
    [
      currentTrack,
      isPlaying,
      isExpanded,
      progressSeconds,
      durationSeconds,
      volume,
      loadAndPlay,
      play,
      pause,
      seek,
      setVolume,
      expand,
      minimize,
      close,
    ]
  );

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}
