# 🚦 TrafficHive — Frontend

A modern, responsive **React** web application for real-time traffic violation detection and analysis in Bengaluru. Built with **Vite** and powered by AI-driven computer vision.

## 🌐 Live Deployment

| Service | URL |
|---------|-----|
| **Frontend (Live)** | [traffichive-bengaluru-frontend.vercel.app](https://traffichive-bengaluru-frontend.vercel.app) |
| **Backend API** | [harsshks-traffichive-banglore-backend.hf.space](https://harsshks-traffichive-banglore-backend.hf.space) |
| **Backend Repo** | [github.com/harsshks/traffichive-bengaluru-backend](https://github.com/harsshks/traffichive-bengaluru-backend) |

## ✨ Features

- **🔍 AI Violation Detection** — Upload traffic images/videos and detect violations (no helmet, no seatbelt) using YOLO11 + Roboflow computer vision models
- **📊 Traffic Analytics** — AI-powered traffic scene analysis with density, flow, and safety assessment using Google Gemini
- **🔔 City Updates** — Real-time Bengaluru traffic alerts and air quality monitoring
- **🎨 Premium UI** — Dark-themed, glassmorphic design with smooth animations and responsive layout

## 🏗️ Architecture

```
TrafficHive Frontend (Vite + React)
│
├── 🏠 Home Page
│   ├── Hero Section (animated landing)
│   ├── Model Showcase (AI capabilities)
│   └── City Glimpses
│
├── 🔍 Detection Page
│   ├── Image/Video Upload
│   ├── AI Violation Detection → Backend API
│   ├── Traffic Analysis → Google Gemini API
│   └── Results Dashboard (vehicles, violations, plates)
│
├── 📊 Analytics Page
│   └── Statistics & Insights
│
└── 🔔 City Updates Page
    └── Real-time Bengaluru Traffic & AQI Data
```

## 🔧 Tech Stack

| Component | Technology |
|-----------|-----------|
| **Framework** | React 18 + Vite |
| **Styling** | Vanilla CSS (Glassmorphism + Dark Theme) |
| **Routing** | React Router v6 |
| **AI Analysis** | Google Gemini API |
| **Violation Detection** | Custom FastAPI Backend (YOLO11 + Roboflow) |
| **Deployment** | Vercel |

## 📁 Project Structure

```
frontend-bengaluru/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json              # Vercel SPA routing config
├── .env.example             # Environment variable template
│
└── src/
    ├── main.jsx             # App entry point
    ├── App.jsx              # Root component with routing
    ├── index.css            # Global styles & design tokens
    │
    ├── pages/
    │   ├── DetectionPage.jsx    # AI violation detection page
    │   ├── StatisticsPage.jsx   # Traffic analytics dashboard
    │   ├── SecondPage.jsx       # City updates page
    │   └── ModelDetail.jsx      # Individual model details
    │
    ├── components/
    │   ├── Navbar/              # Navigation bar
    │   ├── Hero/                # Animated hero section
    │   ├── Models/              # AI model showcase cards
    │   ├── Glimpses/            # City glimpses carousel
    │   ├── Footer/              # Site footer
    │   ├── ViolationDetection/  # Detection UI component
    │   ├── TrafficAnalysisDisplay/ # Gemini analysis results
    │   ├── BengaluruUpdates/    # City traffic updates
    │   └── AmbientSpheres/     # Background animations
    │
    ├── utils/
    │   ├── violationAPI.js      # Backend API integration
    │   └── geminiAPI.js         # Google Gemini API integration
    │
    └── assets/                  # Images, logos, SVGs
```

## 🚀 Quick Start (Local Development)

### 1. Clone the repository
```bash
git clone https://github.com/harsshks/traffichive-bengaluru-frontend.git
cd traffichive-bengaluru-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
# Create a .env file in the root directory
VITE_API_BASE_URL=https://harsshks-traffichive-banglore-backend.hf.space
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Start development server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_BASE_URL` | Backend API URL | ✅ Yes |
| `VITE_GEMINI_API_KEY` | Google Gemini API key for traffic analysis | ✅ Yes |

## 📸 Key Pages

### Home Page
- Animated hero section with gradient backgrounds
- AI model showcase with interactive cards
- City glimpses carousel

### Detection Page
- Drag-and-drop image/video upload
- Real-time violation detection (helmet, seatbelt, license plate)
- AI-powered traffic scene analysis (density, flow, safety)
- Detailed vehicle-by-vehicle results

### Analytics Page
- Traffic statistics dashboard
- Historical violation data

### City Updates
- Real-time Bengaluru traffic alerts
- Air Quality Index monitoring

## 👥 Team

TrafficHive — Bengaluru Traffic Violation Detection System
