# MEMORI MSDI

A memorial website built to preserve the moments, laughter, and stories we shared during our time together at MSDI. More than just photos — it's a place to keep the memories that shaped us.

> *"We came as strangers, but we leave as family."*

## 💭 What is this?

This is a space for everyone who was part of MSDI to revisit the journey we took together. Every photo, message, and section here tells a piece of our story — from the awkward first days to the moments that became core memories.

The website lets you:
- **Explore memories** through an interactive 3D photo sphere
- **Upload your own photos** and add to the shared collection
- **Read personal messages** from every member of the community
- **Relive key moments** through studio photos and candid shots

It's not about perfection. It's about remembering what made this time meaningful.

## ✨ What's inside

- **3D Photo Globe** — Spin through 60+ photos in an interactive dome. Click any photo to see it up close. Works on desktop and mobile.
- **Photo Upload** — Everyone can contribute their own photos to the collection. They'll appear in the globe for everyone to see.
- **Film Strip Gallery** — Vintage-style scrolling reels with studio photos from our time together.
- **Personal Notes** — Messages from 30+ members, each one a piece of the story we built together.
- **Mentor Tributes** — Cards honoring the people who made Malang feel a little more like home.
- **Video Recap** — The whole year, condensed into one video.

## 🛠 Built with

- **React 19** + **Vite 7** — Fast, modern web app
- **Tailwind v4** — Clean, responsive styling
- **GSAP** — Smooth scroll animations throughout
- **Vercel** — Hosting and serverless backend
- **Vercel Blob** — Photo storage for user uploads

## 📂 Project structure

```
memorimsdi/
├── public/
│   ├── images/
│   │   ├── fotoenjoy/       # Main photo collection
│   │   │   └── thumb/       # Optimized thumbnails for mobile
│   │   ├── potostudio/      # Studio photos for film strips
│   │   ├── fotokakaks/      # Mentor photos
│   │   └── fotokartun/      # Cartoon avatars for personal notes
│   ├── sitemap.xml
│   └── robots.txt
├── src/
│   ├── hero.jsx            # Landing section
│   ├── gallery.jsx         # 3D photo dome + upload button
│   ├── domegallery.jsx     # The interactive sphere logic
│   ├── filmstrip.jsx       # Scrolling vintage film reels
│   ├── moments.jsx         # Personal message cards
│   ├── timeline.jsx        # Mentor tribute cards
│   ├── video.jsx           # Year recap video embed
│   ├── ending.jsx          # Closing section
│   ├── uploadphoto.jsx     # Photo upload modal
│   ├── adminpage.jsx       # Photo management dashboard
│   └── particles.jsx       # Background particle effect
├── api/
│   ├── upload.js           # Handle photo uploads to Vercel Blob
│   ├── photos.js           # List all uploaded photos
│   └── delete.js           # Remove photos (admin only)
├── scripts/
│   └── optimize-images.mjs # Generate WebP + thumbnails from originals
├── admin.html              # Admin dashboard entry
├── index.html              # Main site entry
└── CLAUDE.md               # Development workflow rules
```

## 🚀 Running locally

```bash
# Clone the repo
git clone https://github.com/pittkajull/memorimsdi.git
cd memorimsdi

# Install dependencies
npm install

# Start dev server
npm run dev
```

Visit `http://localhost:5173`

### Build for production

```bash
npm run build
```

Output goes to `dist/`

## 📸 Adding photos

### For the main collection

1. Drop original photos (JPG/PNG) into `_originals/fotoenjoy/`
2. Run the optimizer:
   ```bash
   node scripts/optimize-images.mjs
   ```
3. This generates:
   - `public/images/fotoenjoy/*.webp` — Full-size photos
   - `public/images/fotoenjoy/thumb/*.webp` — Small versions for the globe tiles
4. Add the new file paths to `src/gallery.jsx` in the `photos` array
5. Build and deploy

### Via the website

Anyone with the upload code can add photos directly through the **"Add your photo"** button on the site. They'll appear in the globe immediately.

## 🎨 Sections

| Section | What it does |
|---------|--------------|
| **Hero** | Full-screen intro with parallax scrolling |
| **Film Strip** | Horizontal scrolling studio photos with vintage sprocket holes |
| **3D Gallery** | Interactive photo sphere — drag to spin, click to enlarge |
| **Personal Notes** | Handwritten-style cards with messages from each member |
| **Mentors** | Thank-you cards for the people who guided us |
| **Video** | Year recap embedded from YouTube |
| **Ending** | Closing thoughts and final quote |

## 🔐 Admin dashboard

Visit `/admin` and enter the access code. You can:
- See all uploaded photos
- Delete any photo from the collection
- Refresh the list

Access is restricted — only people with the code can get in.

## 🌍 Live site

**[memorimsdi.my.id](https://memorimsdi.my.id)**

## 🧑‍💻 Development notes

- **Thumbnail strategy:** The globe loads small 220px thumbnails to keep mobile smooth. Full-size images are only loaded when you click a photo.
- **Mobile optimization:** Fewer tiles on phones (16 vs 26), auto-rotation disabled, particles turned off, and CSS blur effects replaced with gradients.
- **Drag smoothness:** Inertia physics calculated per-second instead of per-frame so it feels identical on any screen refresh rate.
- **Upload security:** Photos can only be added to the `/kiriman/` folder. Admin delete endpoint has scope guards to prevent accidental deletion of static assets.

## 📝 License

© 2025 MSDI. All rights reserved.

---

Built with care for the people who made these memories worth keeping.
