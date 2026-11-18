# DevFest Prayagraj ’26 — Where Code Meets Culture

Official-style community event website for **DevFest Prayagraj ’26** (GDG Prayagraj), built with React, TypeScript, Tailwind CSS, **GSAP + ScrollTrigger**, **Motion**, and **Lenis** smooth scroll.

## Features
- **Animated Prayagraj Boat Preloader**: Yamuna Bridge → City & Mandir → Triveni Sangam loading voyage (with Skip option).
- **Dark-Light Editorial Theme**: Cinematic Dark Midnight Hero with minimal-visibility New Yamuna Bridge video background + GSAP scroll parallax, rainbow-bordered interactive arch, and Warm Parchment drafting-grid content sections.
- **Official DevFest 2026 Assets**: Integrated official DevFest logos, role badges (`Attendee`, `Speaker`, `Organizer`, `Stay Updated`), key art, and sticker sheet.
- **4 Core Tracks**: AI, Google Cloud, Web Development, and Developer Community.
- **Multi-View Interactive Schedule**: Switch between **Grid**, **Hall Lanes**, and **Timeline** views with track filters, search, and `localStorage` bookmarking.
- **12 Featured Speakers**: Local portraits, track filters, and interactive speaker detail modals.
- **Holographic Badge Studio**: Live customizable Lanyard & 1:1 Social Avatar generator with 3 themes, photo upload, celebratory confetti, and 1-click 1080px PNG export.
- **Last Year Highlights Gallery**: Category-filtered photo gallery (`Keynotes`, `Workshops`, `Community`, `Swag`) with fullscreen keyboard-navigable Lightbox.
- **Interactive Polaroid Board, Partners, FAQ & Instant Pass Modal**.

## Tech Stack
- **React 19 + Vite + TypeScript**
- **Tailwind CSS v4**
- **GSAP + ScrollTrigger**
- **Motion (`motion/react`)**
- **Lenis** smooth scrolling
- **Lucide React** & **Canvas Confetti**

## Run Locally
```bash
npm install
npm run dev
```

## Build for Production
```bash
npm run build
```

## Customize Event Content
Edit [`src/data/devfestData.ts`](./src/data/devfestData.ts) to update event dates, venue, sessions, speakers, gallery photos, sponsors, and FAQs.
