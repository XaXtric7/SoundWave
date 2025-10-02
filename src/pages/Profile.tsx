import { useState } from "react";
import {
  Heart,
  MessageSquare,
  Share2,
  User,
  Music,
  ListMusic,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ThemeToggle";

// Track component for profile
const ProfileTrack = ({
  title,
  plays,
  duration,
  coverUrl,
}: {
  title: string;
  plays: number;
  duration: string;
  coverUrl: string;
}) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="flex items-center p-3 hover:bg-muted/50 rounded-md group">
      <img
        src={coverUrl}
        alt={title}
        className="h-12 w-12 rounded object-cover mr-3"
      />
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-xs text-muted-foreground">
          {plays.toLocaleString()} plays • {duration}
        </p>
      </div>
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart
            className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
          />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MessageSquare className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Comment component
const Comment = ({
  username,
  avatar,
  content,
  time,
}: {
  username: string;
  avatar: string;
  content: string;
  time: string;
}) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="flex gap-3 mb-4">
      <img
        src={avatar}
        alt={username}
        className="h-10 w-10 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h4 className="font-medium">{username}</h4>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
        <p className="text-sm mt-1">{content}</p>
        <div className="flex items-center gap-4 mt-2">
          <button
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart
              className={`h-3 w-3 ${
                isLiked ? "fill-red-500 text-red-500" : ""
              }`}
            />
            {isLiked ? "Liked" : "Like"}
          </button>
          <button className="text-xs text-muted-foreground hover:text-foreground">
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ProfilePage() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  // Sample data
  const userTracks = [
    {
      id: 1,
      title: "Summer Nights",
      plays: 12543,
      duration: "3:45",
      coverUrl:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=120",
    },
    {
      id: 2,
      title: "Neon Dreams",
      plays: 8721,
      duration: "4:12",
      coverUrl:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=120",
    },
    {
      id: 3,
      title: "Midnight Drive",
      plays: 5432,
      duration: "3:28",
      coverUrl:
        "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=120",
    },
  ];

  const playlists = [
    {
      id: 1,
      title: "Chill Vibes",
      tracks: 12,
      coverUrl:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=120",
    },
    {
      id: 2,
      title: "Workout Mix",
      tracks: 8,
      coverUrl:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=120",
    },
  ];

  const followers = [
    {
      id: 1,
      username: "alex_music",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120",
    },
    {
      id: 2,
      username: "sarah_beats",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120",
    },
    {
      id: 3,
      username: "mike_producer",
      avatar:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120",
    },
  ];

  const following = [
    {
      id: 1,
      username: "dj_smith",
      avatar:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120",
    },
    {
      id: 2,
      username: "electronic_vibes",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120",
    },
  ];

  const comments = [
    {
      id: 1,
      username: "alex_music",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120",
      content: "This track is amazing! Love the bass line.",
      time: "2 days ago",
    },
    {
      id: 2,
      username: "sarah_beats",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120",
      content: "Great work as always! Can't wait to hear more.",
      time: "1 week ago",
    },
    {
      id: 3,
      username: "mike_producer",
      avatar:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120",
      content: "The production quality is top notch!",
      time: "2 weeks ago",
    },
    {
      id: 4,
      username: "dj_smith",
      avatar:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120",
      content: "I've been playing this in my sets. Crowd loves it!",
      time: "3 weeks ago",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Background with blur */}
      <div
        className="fixed inset-0 bg-cover bg-center opacity-20 dark:opacity-10 -z-10"
        style={{
          backgroundImage: `url(/src/assets/backgrounds/festival.jpg)`,
          backgroundSize: "cover",
          filter: "contrast(1.1) brightness(1.1)",
        }}
      />
      <div className="fixed inset-0 bg-background/50 backdrop-blur-[1px] -z-10" />

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">SoundWave</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Profile Banner */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-orange-500 to-pink-500">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800)`,
          }}
        />
        <div className="absolute -bottom-16 left-6 md:left-10">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200"
              alt="Profile"
              className="h-32 w-32 rounded-full border-4 border-background object-cover"
            />
            <div className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center border-2 border-background">
              <User className="h-4 w-4 text-primary-foreground" />
            </div>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="container pt-20 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Sarah Williams</h1>
            <p className="text-muted-foreground">
              @sarah_music • Los Angeles, CA
            </p>
            <p className="mt-2 max-w-md">
              Producer, DJ, and electronic music enthusiast. Creating vibes
              since 2015.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant={isFollowing ? "outline" : "default"}
              className={`${
                isFollowing
                  ? "border-primary text-primary hover:bg-primary/10"
                  : ""
              } transition-all duration-300`}
              onClick={toggleFollow}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
            <Button variant="outline">Share</Button>
          </div>
        </div>

        <div className="flex gap-6 mt-6 text-sm">
          <div>
            <span className="font-bold">15</span>{" "}
            <span className="text-muted-foreground">Tracks</span>
          </div>
          <div>
            <span className="font-bold">1.2K</span>{" "}
            <span className="text-muted-foreground">Followers</span>
          </div>
          <div>
            <span className="font-bold">348</span>{" "}
            <span className="text-muted-foreground">Following</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container pb-20">
        <Tabs defaultValue="tracks" className="w-full">
          <TabsList className="w-full max-w-md grid grid-cols-4">
            <TabsTrigger value="tracks" className="flex items-center gap-2">
              <Music className="h-4 w-4" />
              <span className="hidden sm:inline">Tracks</span>
            </TabsTrigger>
            <TabsTrigger value="playlists" className="flex items-center gap-2">
              <ListMusic className="h-4 w-4" />
              <span className="hidden sm:inline">Playlists</span>
            </TabsTrigger>
            <TabsTrigger value="followers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Followers</span>
            </TabsTrigger>
            <TabsTrigger value="following" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Following</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tracks" className="mt-6">
            <div className="space-y-1">
              {userTracks.map((track) => (
                <ProfileTrack
                  key={track.id}
                  title={track.title}
                  plays={track.plays}
                  duration={track.duration}
                  coverUrl={track.coverUrl}
                />
              ))}
            </div>

            {/* Comments Section */}
            <div className="mt-8 border-t pt-6">
              <h3 className="font-semibold mb-4">
                Comments on "Summer Nights"
              </h3>
              <div className="space-y-4">
                {comments
                  .slice(0, showAllComments ? comments.length : 2)
                  .map((comment) => (
                    <Comment
                      key={comment.id}
                      username={comment.username}
                      avatar={comment.avatar}
                      content={comment.content}
                      time={comment.time}
                    />
                  ))}

                {!showAllComments && comments.length > 2 && (
                  <Button
                    variant="ghost"
                    className="text-primary"
                    onClick={() => setShowAllComments(true)}
                  >
                    Show all {comments.length} comments
                  </Button>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="playlists" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="group relative rounded-md overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={playlist.coverUrl}
                      alt={playlist.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-12 w-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
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
                    <h3 className="font-semibold truncate">{playlist.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {playlist.tracks} tracks
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="followers" className="mt-6">
            <div className="space-y-4">
              {followers.map((follower) => (
                <div
                  key={follower.id}
                  className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-md"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={follower.avatar}
                      alt={follower.username}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium">@{follower.username}</h3>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Follow Back
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="following" className="mt-6">
            <div className="space-y-4">
              {following.map((follow) => (
                <div
                  key={follow.id}
                  className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-md"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={follow.avatar}
                      alt={follow.username}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium">@{follow.username}</h3>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Unfollow
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
