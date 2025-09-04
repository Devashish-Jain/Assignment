# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **School Directory Application** - a full-stack TypeScript web application for managing and discovering educational institutions. It features a React frontend with advanced animations and a Node.js/Express backend with MySQL database integration.

### Architecture Pattern
- **Monorepo Structure**: Frontend and backend in separate directories (`client/` and `server/`)
- **Full TypeScript**: Both frontend and backend use TypeScript for type safety
- **RESTful API**: Clean separation between client and server with REST endpoints
- **Component-Based Frontend**: React with functional components and hooks
- **Layered Backend**: Controllers → Routes → Services → Database pattern

## Tech Stack Summary

**Frontend (`client/`)**:
- React 18 + TypeScript + Vite
- Tailwind CSS for styling
- Framer Motion for animations
- React Query for state management
- React Router for navigation
- Specialized animation libraries: Lenis (smooth scroll), SwiperJS (carousels), React CountUp

**Backend (`server/`)**:
- Node.js + Express + TypeScript
- MySQL2 for database connectivity
- Multer for file uploads
- SkySQL (MariaDB) database

## Common Development Commands

### Quick Start (Development)
```bash
# Start backend server (from project root)
cd school-directory-app/server && npm run dev

# Start frontend dev server (from project root, new terminal)
cd school-directory-app/client && npm run dev
```

### Backend Commands (server/)
```bash
npm run dev       # Start development server with hot reload
npm run build     # Compile TypeScript to JavaScript
npm start         # Start production server (requires build first)
```

### Frontend Commands (client/)
```bash
npm run dev       # Start Vite development server (http://localhost:5173)
npm run build     # Build for production (TypeScript check + Vite build)
npm run preview   # Preview production build locally
npm run lint      # Run ESLint with TypeScript rules
```

### Full Application Build
```bash
# Build both frontend and backend for production
cd school-directory-app/server && npm run build
cd ../client && npm run build
```

## Code Architecture

### Frontend Architecture (`client/src/`)

**Core App Setup**:
- `App.tsx` - Main application component with React Query provider and router setup
- `main.tsx` - Entry point with React StrictMode
- Routes: `/schools` (default), `/add-school`

**Component Organization**:
```
components/
├── layout/           # Navigation and layout components
├── common/           # Shared components (ErrorMessage, LoadingSpinner)
├── AddSchoolPage/    # School creation form components
└── ShowSchoolsPage/  # School display and search components
    ├── ParallaxHero.tsx     # Hero section with parallax effects
    ├── StatsSection.tsx     # Animated statistics counters
    ├── SchoolCard.tsx       # Individual school display with hover effects
    ├── ImageSlider.tsx      # SwiperJS carousel component
    └── SearchBar.tsx        # Real-time search functionality
```

**Key Patterns**:
- Custom hooks in `hooks/` (e.g., `useSmoothScroll`)
- API services in `services/` using Axios
- React Query for server state management with caching strategies
- Form handling with React Hook Form + Zod validation

### Backend Architecture (`server/src/`)

**Core Structure**:
- `server.ts` - Application entry point with middleware setup and error handling
- Follows MVC pattern: Routes → Controllers → Services

**API Organization**:
```
routes/
├── schoolRoutes.ts   # All school-related endpoints

controllers/
├── schoolController.ts  # Request/response handling logic

services/
├── database.ts          # Database connection and initialization
└── schoolService.ts     # Business logic and data operations
```

**Key Features**:
- Comprehensive error handling and logging
- File upload handling with Multer
- Health check endpoint (`/health`)
- Static file serving for uploaded images
- Database connection pooling

### Database Schema

Single `schools` table with:
- Basic school information (name, address, city, state, contact, email)
- JSON array for multiple image filenames
- Auto-increment ID and timestamp fields

## Animation & UX Features

The application includes several sophisticated animation systems:

1. **Lenis Smooth Scrolling** - Physics-based smooth scrolling
2. **Parallax Effects** - Multi-layer parallax hero section
3. **Figure-8 Hover Animation** - CSS Motion Path card hover effects
4. **Scroll-triggered Animations** - Content reveals and counter animations
5. **SwiperJS Carousels** - Professional image galleries with navigation

## Environment Setup

**Backend Environment (server/.env)**:
- `PORT` - Server port (default: 8080)
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` - SkySQL database connection

**Frontend Environment (client/.env)**:
- `VITE_API_BASE_URL` - Backend API URL (default: http://localhost:8080)

## Development Notes

### File Structure Patterns
- TypeScript types are centralized in `types/` directories
- Styles use Tailwind CSS with custom configuration
- Images are uploaded to `schoolImages/` directory (served statically)

### Key Dependencies
- **Animation**: `framer-motion`, `@studio-freight/lenis`, `swiper`, `react-countup`
- **Forms**: `react-hook-form`, `@hookform/resolvers`, `zod`
- **State**: `@tanstack/react-query`
- **Database**: `mysql2` with connection pooling
- **File Upload**: `multer` with local storage

### Performance Considerations
- React Query caching with 5-minute stale time
- Hardware-accelerated CSS animations
- Lazy loading and progressive image enhancement
- Connection pooling for database operations

## Testing the Application

1. Health check: `GET http://localhost:8080/health`
2. Main application: `http://localhost:5173`
3. API endpoints: `http://localhost:8080/api/schools`

The application supports full CRUD operations for schools with image upload functionality and real-time search capabilities.
