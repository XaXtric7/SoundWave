# OrangeWave - Music Streaming Platform

A modern, responsive music streaming web application built with React, TypeScript, and Tailwind CSS. Discover, play, and share music with a beautiful, intuitive interface.

<img width="7680" height="4320" alt="Image" src="https://github.com/user-attachments/assets/3bed1ce3-f66e-4209-929a-12af4d18ceef" />

## 🎵 Features

### 🎶 Dynamic Music Player

- **Smart Player Bar** - Only appears when music is playing
- **Mini & Full Player** - Toggle between compact and full-screen views
- **Real Audio Controls** - Play, pause, seek, volume control
- **Progress Tracking** - Real-time progress bar with time display
- **Responsive Design** - Works seamlessly on desktop and mobile

### 🎨 Modern UI/UX

- **Dark/Light Theme** - Toggle between themes with persistent settings
- **Landing Page Intro** - Playable sample track with cover art
- **Artist Profiles** - Accessible profile pages for artists
- **Search Functionality** - Search tracks, artists, and playlists
- **Notification System** - Real-time notifications for user interactions

### 🚀 User Experience

- **Smooth Animations** - Rotating disc animation during playback
- **Intuitive Navigation** - Easy-to-use mobile and desktop navigation
- **Track Discovery** - Browse trending tracks, new releases, and genres
- **Social Features** - Like, comment, and share tracks

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context API
- **Routing**: React Router
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd orange-wave-front
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Player.tsx      # Main player component
│   ├── MiniPlayer.tsx  # Compact player view
│   └── FullPlayer.tsx  # Full-screen player view
├── contexts/           # React contexts
│   ├── ThemeContext.tsx    # Theme management
│   └── PlayerContext.tsx   # Music player state
├── pages/              # Application pages
│   ├── Index.tsx       # Landing page
│   ├── Home.tsx        # Main dashboard
│   ├── Profile.tsx     # User profile
│   └── ...
├── assets/             # Static assets
│   ├── backgrounds/    # Background images
│   └── music/          # Audio files and covers
└── lib/                # Utility functions
```

## 🎵 Usage

### Playing Music

1. Visit the landing page to play the intro track
2. Browse tracks on the home page
3. Click any track to start playing
4. Use the mini player controls or expand to full view

### Navigation

- **Desktop**: Use the header navigation
- **Mobile**: Use the bottom navigation bar
- **Profile**: Access via mobile nav or direct URL

### Theme Switching

- Click the theme toggle in the top-right corner
- Theme preference is saved automatically

## 🎨 Customization

### Adding New Tracks

1. Place audio files in `src/assets/music/`
2. Add cover images to `src/assets/music/cover/`
3. Update track data in the respective page components

### Styling

- Modify `tailwind.config.ts` for theme customization
- Update `src/index.css` for global styles
- Component-specific styles use Tailwind classes

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Deploy

The built files in the `dist` folder can be deployed to any static hosting service like:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Lucide](https://lucide.dev/) for amazing icons
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Vite](https://vitejs.dev/) for fast development experience

---

**OrangeWave** - Where music meets innovation 🎵✨
