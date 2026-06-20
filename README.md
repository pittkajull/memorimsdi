# MEMORI MSDI

A cinematic memorial website dedicated to preserving the precious moments and memories of MSDI. Built with React, Tailwind CSS, and GSAP animations, this website tells the story of a journey through scattered photos, film strips, and heartfelt messages.

## 🌟 Features

- **Hero Section** - Full-screen cinematic intro with parallax scrolling effect
- **Film Strip Animation** - Infinite scrolling film reels showcasing studio photos with vintage sprocket holes
- **Photo Gallery** - Masonry-style grid layout with hover effects for 60+ memory photos
- **Timeline** - Journey timeline from 2023-2025 marking key milestones
- **Moments Section** - Highlighting teamwork, family bonds, and achievements
- **Ending Section** - Scattered polaroid photos with paper note and cinematic "THE END" typography
- **Smooth Animations** - GSAP-powered scroll-triggered animations throughout

## 🛠️ Tech Stack

- **React** - UI framework (v19)
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework (v4)
- **GSAP** - Animation library with ScrollTrigger plugin
- **Framer Motion** - Additional animation capabilities

## 📁 Project Structure

```
memorimsdi/
├── public/
│   └── images/
│       ├── fotoenjoy/      # Memory photos (60+ images)
│       ├── potostudio/     # Studio photos for film strips
│       └── logomsdi.svg    # MSDI logo
├── src/
│   ├── hero.jsx           # Hero section with parallax
│   ├── filmstrip.jsx      # Film strip animation
│   ├── gallery.jsx        # Photo gallery grid
│   ├── timeline.jsx       # Journey timeline
│   ├── moments.jsx        # Teamwork & achievements
│   ├── ending.jsx         # Scattered photos & END text
│   ├── footer.jsx         # Footer with quote
│   ├── main.jsx           # App entry point
│   └── index.css          # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.cjs
└── postcss.config.cjs
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/pittkajull/memorimsdi.git

# Navigate to project directory
cd memorimsdi

# Install dependencies
npm install

# Start development server
npm run dev
```

The website will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

## 🎨 Sections Overview

| Section | Description |
|---------|-------------|
| **Hero** | Full-screen intro with MEMORI MSDI title and descriptive text |
| **Film Strip** | Two rows of infinite scrolling photos with vintage film effect |
| **Gallery** | Masonry grid of 60+ memory photos with hover overlays |
| **Timeline** | Journey from 2023 (Beginning) → 2024 (Challenges) → 2025 (Achievements) |
| **Moments** | Cards highlighting Teamwork, Family, and Achievements |
| **Ending** | Scattered polaroids with "THE END" cinematic typography |
| **Footer** | Closing quote and MSDI branding |

## 📸 Photo Categories

- **fotoenjoy/** - Candid moments and fun photos from MSDI activities
- **potostudio/** - Professional studio photos for film strip section

## 🎬 Animations

- Parallax scrolling on hero image
- Infinite horizontal scroll on film strips
- Fade-in and scale animations on gallery items
- Scroll-triggered animations on all sections
- Hover effects with scale and overlay transitions

## 📝 License

© 2025 MSDI. All rights reserved.

---

*"We came as strangers, but we leave as family."*
