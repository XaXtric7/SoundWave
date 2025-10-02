import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Headphones, Users, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import bgImage from '@/assets/backgrounds/festival.jpg';

const TUTORIAL_SLIDES = [
  {
    icon: Upload,
    title: 'Upload Your Music',
    description: 'Share your tracks with the world. Upload audio files, add artwork, and write descriptions to showcase your sound.',
    gradient: 'from-primary/20 to-primary/5',
  },
  {
    icon: Headphones,
    title: 'Discover New Sounds',
    description: 'Explore millions of tracks from artists worldwide. Create playlists, like songs, and build your perfect music collection.',
    gradient: 'from-blue-500/20 to-blue-500/5',
  },
  {
    icon: Users,
    title: 'Connect with Artists',
    description: 'Follow your favorite artists, comment on tracks, and join a community of music lovers and creators.',
    gradient: 'from-purple-500/20 to-purple-500/5',
  },
];

export default function Tutorial() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < TUTORIAL_SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/');
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSkip = () => {
    navigate('/');
  };

  const slide = TUTORIAL_SLIDES[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Image - Enhanced visibility */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          filter: "contrast(1.1) brightness(1.1)"
        }}
      />
      
      {/* Overlay for better contrast - reduced opacity */}
      <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px]" />

      {/* Theme toggle */}
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>

      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 left-6 z-10 text-muted-foreground hover:text-primary transition-colors font-medium"
      >
        Skip tutorial
      </button>

      <div className="w-full max-w-2xl relative z-10">
        {/* Slide indicators */}
        <div className="flex justify-center gap-2 mb-8">
          {TUTORIAL_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-muted hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>

        {/* Content Card */}
        <div className="bg-card rounded-2xl shadow-lg p-8 md:p-12 animate-fade-in">
          <div className={`w-24 h-24 rounded-2xl mx-auto mb-8 flex items-center justify-center bg-gradient-to-br ${slide.gradient} backdrop-blur-sm`}>
            <Icon className="w-12 h-12 text-primary" />
          </div>

          <h2 className="text-4xl font-bold text-foreground mb-4 text-center">
            {slide.title}
          </h2>
          
          <p className="text-lg text-muted-foreground text-center mb-12 leading-relaxed max-w-md mx-auto">
            {slide.description}
          </p>

          {/* Navigation */}
          <div className="flex justify-between items-center gap-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentSlide === 0}
              className="h-12 px-6 disabled:opacity-0 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back
            </Button>

            <Button
              onClick={handleNext}
              className="h-12 px-8 bg-gradient-orange text-white font-semibold shadow-orange hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              {currentSlide === TUTORIAL_SLIDES.length - 1 ? 'Get Started' : 'Next'}
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>

        {/* Progress text */}
        <p className="text-center mt-6 text-sm text-muted-foreground">
          {currentSlide + 1} of {TUTORIAL_SLIDES.length}
        </p>
      </div>
    </div>
  );
}
