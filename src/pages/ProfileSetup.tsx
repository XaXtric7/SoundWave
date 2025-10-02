import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, User, FileText, Music, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ThemeToggle } from '@/components/ThemeToggle';
import bgImage from '@/assets/backgrounds/soundwave-blue.jpg';

const MUSIC_GENRES = [
  'Pop', 'Rock', 'Hip Hop', 'Electronic', 'Jazz', 'Classical',
  'R&B', 'Country', 'Indie', 'Metal', 'Folk', 'Blues'
];

export default function ProfileSetup() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [profileImage, setProfileImage] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const steps = [
    { icon: Camera, title: 'Profile Picture', description: 'Upload your photo' },
    { icon: User, title: 'Username', description: 'Choose your unique name' },
    { icon: FileText, title: 'Bio', description: 'Tell us about yourself' },
    { icon: Music, title: 'Favorite Genres', description: 'Pick your music taste' },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/tutorial');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0: return true; // Profile picture is optional
      case 1: return username.length >= 3;
      case 2: return true; // Bio is optional
      case 3: return selectedGenres.length > 0;
      default: return false;
    }
  };

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

      <div className="w-full max-w-2xl relative z-10">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex-1 text-center transition-all duration-300 ${
                  index <= currentStep ? 'opacity-100' : 'opacity-30'
                }`}
              >
                <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center transition-all duration-300 ${
                  index === currentStep
                    ? 'bg-gradient-orange text-white shadow-orange scale-110'
                    : index < currentStep
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-orange transition-all duration-500 ease-out"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-card rounded-2xl shadow-lg p-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {steps[currentStep].title}
          </h2>
          <p className="text-muted-foreground mb-8">{steps[currentStep].description}</p>

          {/* Step Content */}
          <div className="min-h-[300px] flex items-center justify-center">
            {currentStep === 0 && (
              <div className="w-full text-center space-y-6">
                <div className="relative w-32 h-32 mx-auto">
                  <div className={`w-32 h-32 rounded-full overflow-hidden border-4 border-primary ${
                    profileImage ? '' : 'bg-muted flex items-center justify-center'
                  }`}>
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="w-12 h-12 text-muted-foreground" />
                    )}
                  </div>
                  <label htmlFor="profile-upload" className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-orange rounded-full flex items-center justify-center cursor-pointer shadow-orange hover:scale-110 transition-transform">
                    <Camera className="w-5 h-5 text-white" />
                  </label>
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                <p className="text-sm text-muted-foreground">Click the camera icon to upload</p>
              </div>
            )}

            {currentStep === 1 && (
              <div className="w-full space-y-4">
                <Input
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-14 text-lg"
                  maxLength={20}
                />
                <p className="text-sm text-muted-foreground text-right">
                  {username.length}/20 characters
                </p>
              </div>
            )}

            {currentStep === 2 && (
              <div className="w-full space-y-4">
                <Textarea
                  placeholder="Tell us about yourself and your music taste..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="min-h-[200px] text-lg resize-none"
                  maxLength={200}
                />
                <p className="text-sm text-muted-foreground text-right">
                  {bio.length}/200 characters
                </p>
              </div>
            )}

            {currentStep === 3 && (
              <div className="w-full">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {MUSIC_GENRES.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => toggleGenre(genre)}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                        selectedGenres.includes(genre)
                          ? 'border-primary bg-primary-light text-primary font-semibold shadow-md scale-105'
                          : 'border-border hover:border-primary hover:bg-primary-light/50'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  Selected: {selectedGenres.length} genre{selectedGenres.length !== 1 ? 's' : ''}
                </p>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 gap-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="h-12 px-6 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="h-12 px-8 bg-gradient-orange text-white font-semibold shadow-orange hover:shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
            >
              {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
