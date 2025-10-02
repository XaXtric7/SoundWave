import { MiniPlayer } from "./MiniPlayer";
import { FullPlayer } from "./FullPlayer";
import { usePlayer } from "@/contexts/PlayerContext";

export function Player() {
  const { currentTrack, isExpanded } = usePlayer();

  return <>{currentTrack && (isExpanded ? <FullPlayer /> : <MiniPlayer />)}</>;
}
