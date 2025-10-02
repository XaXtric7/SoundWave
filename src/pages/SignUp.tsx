import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Music2, Mail, Chrome, Apple } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/ThemeToggle';
import bgImage from '@/assets/backgrounds/nightclub.jpg';

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSignUp = () => {
    const newErrors = { email: '', password: '' };
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    
    if (!newErrors.email && !newErrors.password) {
      navigate('/profile-setup');
    }
  };

  const handleSocialSignUp = (provider: string) => {
    console.log(`Sign up with ${provider}`);
    navigate('/profile-setup');
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

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-orange mb-4 shadow-orange">
            <Music2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Join SoundWave</h1>
          <p className="text-muted-foreground">Create your account and start sharing music</p>
        </div>

        {/* Sign Up Form */}
        <div className="bg-card rounded-2xl shadow-lg p-8 space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`h-12 ${errors.email ? 'border-destructive' : ''}`}
            />
            {errors.email && (
              <p className="text-sm text-destructive animate-fade-in">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`h-12 ${errors.password ? 'border-destructive' : ''}`}
            />
            {errors.password && (
              <p className="text-sm text-destructive animate-fade-in">{errors.password}</p>
            )}
          </div>

          {/* Email Sign Up Button */}
          <Button
            onClick={handleEmailSignUp}
            className="w-full h-12 bg-gradient-orange text-white font-semibold rounded-lg shadow-orange hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            <Mail className="w-5 h-5 mr-2" />
            Sign Up with Email
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-card text-muted-foreground">Or continue with</span>
            </div>
          </div>

          {/* Social Sign Up Buttons */}
          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={() => handleSocialSignUp('Google')}
              className="w-full h-12 border-2 hover:border-primary hover:bg-primary-light transition-all duration-300"
            >
              <Chrome className="w-5 h-5 mr-2" />
              Continue with Google
            </Button>

            <Button
              variant="outline"
              onClick={() => handleSocialSignUp('Apple')}
              className="w-full h-12 border-2 hover:border-primary hover:bg-primary-light transition-all duration-300"
            >
              <Apple className="w-5 h-5 mr-2" />
              Continue with Apple
            </Button>
          </div>

          {/* Terms */}
          <p className="text-xs text-center text-muted-foreground mt-6">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>

        {/* Login Link */}
        <p className="text-center mt-6 text-sm text-muted-foreground">
          Already have an account?{' '}
          <button className="text-primary font-semibold hover:underline transition-all">
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}
