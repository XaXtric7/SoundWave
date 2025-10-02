import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, Home, Library, User, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ThemeToggle";

// Track card component
const TrackCard = ({
  title,
  artist,
  coverUrl,
  onPlay,
}: {
  title: string;
  artist: string;
  coverUrl: string;
  onPlay: () => void;
}) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="group relative rounded-md overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="aspect-square relative overflow-hidden">
        <img
          src={coverUrl}
          alt={`${title} by ${artist}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div
          className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
            isHovering ? "opacity-100" : "opacity-0"
          }`}
        >
          <Button
            variant="secondary"
            size="icon"
            className="h-12 w-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={onPlay}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 ml-1"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-semibold truncate">{title}</h3>
        <p className="text-sm text-muted-foreground truncate">{artist}</p>
      </div>
    </div>
  );
};

// Search suggestions component
const SearchSuggestions = ({
  query,
  onClose,
}: {
  query: string;
  onClose: () => void;
}) => {
  if (!query) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-background border rounded-md shadow-lg mt-1 z-50 overflow-hidden">
      <Tabs defaultValue="tracks">
        <TabsList className="w-full">
          <TabsTrigger value="tracks" className="flex-1">
            Tracks
          </TabsTrigger>
          <TabsTrigger value="artists" className="flex-1">
            Artists
          </TabsTrigger>
          <TabsTrigger value="playlists" className="flex-1">
            Playlists
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tracks" className="p-2 space-y-2">
          <div className="flex items-center gap-3 p-2 hover:bg-muted rounded-md cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=120"
              alt="Track"
              className="h-10 w-10 rounded object-cover"
            />
            <div>
              <p className="font-medium">Midnight City</p>
              <p className="text-xs text-muted-foreground">M83</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 hover:bg-muted rounded-md cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=120"
              alt="Track"
              className="h-10 w-10 rounded object-cover"
            />
            <div>
              <p className="font-medium">Midnight Memories</p>
              <p className="text-xs text-muted-foreground">One Direction</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="artists" className="p-2 space-y-2">
          <div className="flex items-center gap-3 p-2 hover:bg-muted rounded-md cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=120"
              alt="Artist"
              className="h-10 w-10 rounded-full object-cover"
            />
            <p className="font-medium">Midnight Kids</p>
          </div>
        </TabsContent>

        <TabsContent value="playlists" className="p-2 space-y-2">
          <div className="flex items-center gap-3 p-2 hover:bg-muted rounded-md cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=120"
              alt="Playlist"
              className="h-10 w-10 rounded object-cover"
            />
            <p className="font-medium">Midnight Vibes</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Notification dropdown
const NotificationDropdown = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="absolute top-full right-0 w-80 bg-background border rounded-md shadow-lg mt-1 z-50 overflow-hidden">
      <div className="p-3 border-b">
        <h3 className="font-semibold">Notifications</h3>
      </div>
      <div className="max-h-80 overflow-y-auto">
        <div className="p-3 border-b hover:bg-muted cursor-pointer">
          <div className="flex gap-3">
            <img
              src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=120"
              alt="User"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm">
                <span className="font-medium">Alex Johnson</span> liked your
                track
              </p>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </div>
          </div>
        </div>
        <div className="p-3 border-b hover:bg-muted cursor-pointer">
          <div className="flex gap-3">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120"
              alt="User"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm">
                <span className="font-medium">Sarah Williams</span> started
                following you
              </p>
              <p className="text-xs text-muted-foreground">5 hours ago</p>
            </div>
          </div>
        </div>
        <div className="p-3 hover:bg-muted cursor-pointer">
          <div className="flex gap-3">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120"
              alt="User"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm">
                <span className="font-medium">Michael Brown</span> commented on
                your track
              </p>
              <p className="text-xs text-muted-foreground">Yesterday</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 border-t text-center">
        <Button variant="ghost" size="sm" className="w-full text-primary">
          View All
        </Button>
      </div>
    </div>
  );
};

export default function HomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSearchSuggestions(e.target.value.length > 0);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  // Sample track data
  const trendingTracks = [
    {
      id: 1,
      title: "Midnight City",
      artist: "M83",
      coverUrl:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300",
    },
    {
      id: 2,
      title: "Blinding Lights",
      artist: "The Weeknd",
      coverUrl:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300",
    },
    {
      id: 3,
      title: "Bad Guy",
      artist: "Billie Eilish",
      coverUrl:
        "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=300",
    },
    {
      id: 4,
      title: "Levitating",
      artist: "Dua Lipa",
      coverUrl:
        "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300",
    },
  ];

  const newReleases = [
    {
      id: 5,
      title: "As It Was",
      artist: "Harry Styles",
      coverUrl:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300",
    },
    {
      id: 6,
      title: "About Damn Time",
      artist: "Lizzo",
      coverUrl:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300",
    },
    {
      id: 7,
      title: "First Class",
      artist: "Jack Harlow",
      coverUrl:
        "https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?w=300",
    },
    {
      id: 8,
      title: "Late Night Talking",
      artist: "Harry Styles",
      coverUrl:
        "https://images.unsplash.com/photo-1504509546545-e000b4a62425?w=300",
    },
  ];

  const electronicTracks = [
    {
      id: 9,
      title: "Strobe",
      artist: "Deadmau5",
      coverUrl:
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300",
    },
    {
      id: 10,
      title: "Opus",
      artist: "Eric Prydz",
      coverUrl:
        "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300",
    },
    {
      id: 11,
      title: "Scary Monsters",
      artist: "Skrillex",
      coverUrl:
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300",
    },
    {
      id: 12,
      title: "Levels",
      artist: "Avicii",
      coverUrl:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=300",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Background with blur */}
      <div
        className="fixed inset-0 bg-cover bg-center opacity-20 dark:opacity-10 -z-10"
        style={{
          backgroundImage: `url(/src/assets/backgrounds/soundwave-blue.jpg)`,
          backgroundSize: "cover",
          filter: "contrast(1.1) brightness(1.1)",
        }}
      />
      <div className="fixed inset-0 bg-background/50 backdrop-blur-[1px] -z-10" />

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold">SoundWave</h1>
            <Button
              variant="ghost"
              onClick={() => navigate("/profile")}
              className="text-sm"
            >
              Profile
            </Button>
          </div>

          <div className="relative flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tracks, artists, or playlists..."
                className="pl-8 pr-4"
                value={searchQuery}
                onChange={handleSearch}
                onFocus={() => setShowSearchSuggestions(searchQuery.length > 0)}
                onBlur={() =>
                  setTimeout(() => setShowSearchSuggestions(false), 200)
                }
              />
              {showSearchSuggestions && (
                <SearchSuggestions
                  query={searchQuery}
                  onClose={() => setShowSearchSuggestions(false)}
                />
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={toggleNotifications}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </Button>
              {showNotifications && (
                <NotificationDropdown
                  onClose={() => setShowNotifications(false)}
                />
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/profile")}
              className="h-10 w-10"
            >
              <User className="h-5 w-5" />
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        <Tabs defaultValue="trending" className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="new">New Releases</TabsTrigger>
              <TabsTrigger value="electronic">Electronic</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="trending" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {trendingTracks.map((track) => (
                <TrackCard
                  key={track.id}
                  title={track.title}
                  artist={track.artist}
                  coverUrl={track.coverUrl}
                  onPlay={() => console.log(`Playing ${track.title}`)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {newReleases.map((track) => (
                <TrackCard
                  key={track.id}
                  title={track.title}
                  artist={track.artist}
                  coverUrl={track.coverUrl}
                  onPlay={() => console.log(`Playing ${track.title}`)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="electronic" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {electronicTracks.map((track) => (
                <TrackCard
                  key={track.id}
                  title={track.title}
                  artist={track.artist}
                  coverUrl={track.coverUrl}
                  onPlay={() => console.log(`Playing ${track.title}`)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-40">
        <div className="flex justify-around items-center h-16">
          <Button
            variant="ghost"
            size="icon"
            className="flex flex-col items-center justify-center h-full"
            onClick={() => navigate("/")}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="flex flex-col items-center justify-center h-full"
          >
            <Search className="h-5 w-5" />
            <span className="text-xs mt-1">Search</span>
          </Button>
          <div className="relative -top-5">
            <Button
              variant="default"
              size="icon"
              className="h-14 w-14 rounded-full"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="flex flex-col items-center justify-center h-full"
          >
            <Library className="h-5 w-5" />
            <span className="text-xs mt-1">Library</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="flex flex-col items-center justify-center h-full"
            onClick={() => navigate("/profile")}
          >
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
