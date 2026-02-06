# Anuka Live - Artist Portfolio Website

A modern, full-stack web application showcasing the music and artistry of Anuka Kipshidze, a musician, producer, sound designer, and multi-instrumentalist from Tbilisi, Georgia.

![Website Preview](https://res.cloudinary.com/dvwkvoqss/image/upload/v1750414669/Anuka_Home_wucmjj.jpg)

## 🎵 About

This is the official website for **Anuka Kipshidze**, featuring:

- **Music Portfolio**: Showcase of released tracks with streaming platform integration
- **Sound Design Portfolio**: Custom audio work and video content
- **News & Blog**: Latest updates, releases, and artistic insights
- **Contact & Booking**: Direct communication channels for collaborations
- **Admin Panel**: Content management system for easy updates

## ✨ Key Features

### 🎸 Music Integration

- **Streaming Platform Links**: Direct integration with Spotify, Apple Music, YouTube, SoundCloud, and Bandcamp
- **Interactive Music Player**: Embedded YouTube player for track previews
- **Responsive Design**: Optimized for desktop and mobile listening experiences

### 🎨 Content Management

- **Secure Admin Panel**: JWT-based authentication for content management
- **Dynamic Content**: Real-time updates for music, blogs, and sound design projects
- **Media Management**: Cloudinary integration for optimized image and video delivery

### 🌐 Modern Architecture

- **React Frontend**: Component-based architecture with React Router for navigation
- **Express.js API**: RESTful backend with secure authentication
- **PostgreSQL Database**: Prisma ORM for type-safe database operations
- **Responsive UI**: SCSS styling with mobile-first design approach

## 🛠️ Technology Stack

### Frontend

- **React 18** - UI library
- **React Router DOM** - Navigation
- **Sass (SCSS)** - Styling
- **React Icons** - Icon components
- **React YouTube** - Video integration

### Backend

- **Express.js** - Web framework
- **Prisma** - Database ORM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Formidable** - File uploads

### Database & Services

- **PostgreSQL** - Primary database
- **Cloudinary** - Media CDN
- **EmailJS** - Contact form handling
- **Vercel** - Deployment platform

## 🗂️ Project Structure

```
├── api/                    # Backend API routes
│   ├── admin/             # Admin-only endpoints
│   ├── get/               # Public data endpoints
│   └── middleware/        # Authentication middleware
├── prisma/                # Database schema and migrations
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/            # Route components
│   ├── layouts/          # Layout components
│   ├── content/          # Content-specific components
│   └── lib/              # Utilities and configurations
└── package.json
```

## 🔒 Admin Panel

Access the admin panel at `/admin/login` with proper credentials to:

- Manage music releases and metadata
- Create and edit blog posts/news
- Upload and organize sound design projects
- Update streaming platform links
- Monitor site analytics

## 🎤 About Anuka Kipshidze

Anuka Kipshidze is a talented musician, producer, sound designer, and multi-instrumentalist based in Tbilisi, Georgia. This website serves as a comprehensive platform to showcase her artistic journey, connect with fans, and provide a professional presence for booking and collaborations.

**Follow Anuka:**

- [Spotify](https://open.spotify.com/artist/1OLjpisqHVt8FvCdjRj9Zc)
- [Apple Music](https://music.apple.com/us/artist/anuka-kipshidze/1697978770)
- [YouTube](https://www.youtube.com/@kipshidzeanuka)

---

Made with ❤️ for the music community. © 2026 Anuka Kipshidze. All rights reserved.
