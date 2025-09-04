# 🎓 School Directory Application

A comprehensive, professional-grade full-stack web application for managing and discovering educational institutions. Built with modern technologies and featuring stunning animations, smooth interactions, and a premium user experience.

## ✨ Features

### Core Functionality
- 📋 **Add New Schools**: Complete form with validation and multi-image upload
- 🏫 **Browse Schools**: Responsive grid layout with detailed school cards
- 🔍 **Advanced Search**: Real-time search by school name, city, or state
- 📱 **Responsive Design**: Optimized for all device sizes

### Premium User Experience
- 🌊 **Smooth Scrolling**: Lenis-powered smooth scroll experience
- ✨ **Parallax Hero**: Multi-layered parallax effects on scroll
- 🎯 **Counter Animations**: Animated statistics with scroll-spy
- 🎨 **Figure-8 Hover Effect**: Unique CSS Motion Path animations
- 📸 **Image Carousels**: SwiperJS-powered photo galleries
- 🎭 **Micro-Interactions**: Framer Motion animations throughout

### Technical Excellence
- 🔒 **Type Safety**: Full TypeScript implementation
- 🎨 **Modern Styling**: Tailwind CSS with custom design system
- 📊 **State Management**: React Query for server state
- ✅ **Form Validation**: React Hook Form with Zod schemas
- 🖼️ **File Uploads**: Multi-image upload with validation
- 🗄️ **Robust Backend**: Express.js with MySQL/SkySQL

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **SwiperJS** for image carousels
- **React CountUp** for number animations
- **Lenis** for smooth scrolling
- **React Hook Form** + **Zod** for forms
- **React Query** for state management
- **React Router** for navigation

### Backend
- **Node.js** with **Express.js**
- **TypeScript** for type safety
- **MySQL2** for database connectivity
- **Multer** for file uploads
- **CORS** for cross-origin requests
- **SkySQL** (MariaDB) database

## 🚀 Quick Start

### Prerequisites
- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **SkySQL/MySQL** database access

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd school-directory-app
   ```

2. **Install backend dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables:**
   
   Create `server/.env` file:
   ```env
   PORT=8080
   DB_HOST=serverless-us-central1.sysp0000.db2.skysql.com
   DB_PORT=4057
   DB_USER=dbpgf01458622
   DB_PASSWORD='%a(y77HQkPtezYXA89b*K'
   DB_NAME=defaultdb
   ```
   
   Create `client/.env` file:
   ```env
   VITE_API_BASE_URL=http://localhost:8080
   ```

### Running the Application

1. **Start the backend server:**
   ```bash
   cd server
   npm run dev
   ```
   Server will start at `http://localhost:8080`

2. **In a new terminal, start the frontend:**
   ```bash
   cd client
   npm run dev
   ```
   Frontend will start at `http://localhost:5173`

3. **Open your browser:**
   Navigate to `http://localhost:5173` to view the application.

## 📁 Project Structure

```
school-directory-app/
├── client/                          # Frontend React application
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── components/              # React components
│   │   │   ├── common/              # Shared components
│   │   │   ├── layout/              # Layout components
│   │   │   ├── AddSchoolPage/       # Add school components
│   │   │   └── ShowSchoolsPage/     # School display components
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── pages/                   # Page components
│   │   ├── services/                # API services
│   │   └── styles/                  # Global styles
│   └── package.json                 # Frontend dependencies
├── server/                          # Backend Express application
│   ├── src/
│   │   ├── controllers/             # Route controllers
│   │   ├── routes/                  # API routes
│   │   ├── services/                # Database and external services
│   │   └── types/                   # TypeScript type definitions
│   └── package.json                 # Backend dependencies
├── schoolImages/                    # Uploaded school images
└── README.md                       # Project documentation
```

## 🎨 Animation Features

### 1. Lenis Smooth Scrolling
Premium smooth scrolling experience with physics-based interpolation.

### 2. Parallax Hero Section
Multi-layered parallax effects with different scroll speeds:
- Background layer (slowest)
- Midground decorative elements
- Foreground content (fastest)

### 3. On-Scroll Reveal Animations
Content animates into view as you scroll:
- School cards fade in from bottom
- Staggered animation timing
- Viewport-based triggers

### 4. Counter-Up Statistics
Numbers animate from 0 to final value when visible:
- Scroll-spy enabled
- Smooth easing animations
- Once-only triggers

### 5. Figure-8 Hover Effect
Unique card hover animation using CSS Motion Path:
- Cards scale up and follow figure-8 path
- High-performance CSS animations
- Smooth enter/exit transitions

### 6. Image Carousels
Professional photo galleries with:
- Fade transitions
- Navigation controls
- Pagination indicators
- Touch/swipe support

## 🔧 Development Scripts

### Frontend (client/)
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend (server/)
```bash
npm run dev          # Start development server with hot reload
npm run build        # Compile TypeScript to JavaScript
npm start            # Start production server
```

## 📊 Database Schema

The application uses a single `schools` table with the following structure:

```sql
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    contact BIGINT NOT NULL,
    email_id VARCHAR(255) NOT NULL,
    images TEXT,                    -- JSON array of image filenames
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the client: `cd client && npm run build`
2. Deploy the `dist/` folder
3. Set environment variable: `VITE_API_BASE_URL=your-api-url`

### Backend (Railway/Heroku/DigitalOcean)
1. Build the server: `cd server && npm run build`
2. Deploy with environment variables from `.env`
3. Ensure `schoolImages/` directory is writable

### Database
- SkySQL (MariaDB) is already configured
- Run the schema creation script on first deployment

## 🔍 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/health` | Health check |
| POST   | `/api/schools` | Create new school (with image upload) |
| GET    | `/api/schools` | Get all schools |
| GET    | `/api/schools/search?q=term` | Search schools |
| GET    | `/api/schools/:id` | Get school by ID |
| GET    | `/images/:filename` | Serve uploaded images |

## 🎯 Performance Optimizations

- **Image Optimization**: Lazy loading and progressive enhancement
- **Code Splitting**: Dynamic imports for route-based splitting
- **Animation Performance**: Hardware acceleration and will-change properties
- **Bundle Optimization**: Tree shaking and modern ES modules
- **Database**: Connection pooling and optimized queries
- **Caching**: React Query caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Framer Motion** for incredible animation capabilities
- **SwiperJS** for robust carousel functionality
- **React CountUp** for smooth number animations
- **Lenis** for premium smooth scrolling
- **Tailwind CSS** for rapid UI development

---

**Built with ❤️ using modern web technologies**
