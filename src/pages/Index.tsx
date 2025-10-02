import { useNavigate } from "react-router-dom";
import { Music2, Sparkles, TrendingUp, Users, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import bgImage from "@/assets/backgrounds/soundwave-pink.jpg";
import { usePlayer } from "@/contexts/PlayerContext";
import cover from "@/music/cover/mv1 helmet.jpg";
import introSong from "@/music/Carte Blanq & Maxx Power - 33 Max Verstappen (Official Audio).mp3";

const Index = () => {
  const navigate = useNavigate();
  const { loadAndPlay } = usePlayer();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image - Enhanced visibility */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          filter: "contrast(1.1) brightness(1.1)",
        }}
      />

      {/* Overlay for better contrast - reduced opacity */}
      <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px]" />

      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-orange" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-orange"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Theme toggle and Profile - increased z-index for better accessibility */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-4">
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

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="animate-fade-in space-y-8 max-w-4xl">
          {/* Logo */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-orange shadow-orange animate-pulse-orange">
            <Music2 className="w-10 h-10 text-white" />
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight">
            Welcome to{" "}
            <span className="bg-gradient-orange bg-clip-text text-transparent">
              SoundWave
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover, upload, and share music with a global community of artists
            and listeners
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              onClick={() => navigate("/signup")}
              className="h-14 px-8 text-lg bg-gradient-orange text-white font-semibold shadow-orange hover:shadow-lg transition-all duration-300 hover:scale-[1.05]"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Get Started
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate("/tutorial")}
              className="h-14 px-8 text-lg border-2 hover:border-primary hover:bg-primary-light transition-all duration-300"
            >
              Take a Tour
            </Button>
          </div>

          {/* Intro Track Preview */}
          <div className="mt-10 flex flex-col items-center gap-4">
            <img
              src={cover}
              alt="Intro cover"
              className="w-40 h-40 rounded-xl shadow-lg object-cover"
            />
            <div className="text-lg font-semibold">33 Max Verstappen</div>
            <div className="text-sm text-muted-foreground">
              Carte Blanq & Maxx Power
            </div>
            <Button
              onClick={() =>
                loadAndPlay({
                  title: "33 Max Verstappen",
                  artist: "Carte Blanq & Maxx Power",
                  coverUrl: cover,
                  src: introSong,
                })
              }
              className="mt-2"
            >
              Play Intro
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 pt-8">
            <div className="bg-card rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Trending Tracks
              </h3>
              <p className="text-muted-foreground">
                Discover what's hot and find your next favorite song
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center mb-4">
                <Music2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Upload Music
              </h3>
              <p className="text-muted-foreground">
                Share your creations with millions of listeners
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Connect
              </h3>
              <p className="text-muted-foreground">
                Follow artists and build your music community
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
