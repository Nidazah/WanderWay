# 🗺️ WanderWay — Travel Planning Platform

> A smart travel companion that helps you discover destinations, plan itineraries, and never miss a memory. Built for wanderers, by wanderers.

---

## 🚀 Project Overview

WanderWay is a full-stack travel planning web application that simplifies trip organization. Users can search for destinations, build day-by-day itineraries, save favorite spots, and collaborate with travel buddies — all in one intuitive dashboard. Whether you're planning a weekend getaway or a month-long expedition, WanderWay keeps your journey on track.

---

## 🎯 Problem It Solves

Planning a trip often involves juggling multiple tabs — Google Maps, booking sites, notes apps, and shared spreadsheets. WanderWay centralizes everything: destination discovery, itinerary building, accommodation suggestions, and collaborative planning. It reduces pre-trip stress and helps travelers spend less time planning and more time exploring.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend UI components & state management |
| Node.js + Express.js | Backend API server |
| MongoDB / PostgreSQL | Database for users, trips, and saved places |
| TailwindCSS | Responsive, modern styling |
| Google Maps API | Interactive maps and location data |
| JWT | Secure user authentication |
| OpenTripMap / Amadeus API | Destination and activity suggestions |

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🔍 Destination Discovery | Search cities and get curated lists of attractions, restaurants, and landmarks |
| 📅 Drag-and-Drop Itinerary | Build flexible daily schedules with visual timeline |
| 💾 Saved Trips | Store past and upcoming trips in your personal dashboard |
| 👥 Collaborative Planning | Share trip boards with friends — everyone can add or edit |
| 📍 Interactive Maps | See all your planned stops pinned on a live map |
| ✅ Packing Checklists | Auto-generated lists based on destination and trip length |
| 📊 Budget Tracker | Log expenses and split costs with travel companions |

---

## ⚙️ How to Run Locally

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB instance (local or Atlas)
- Google Maps API key

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Nidazah/WanderWay.git
cd WanderWay

# 2. Install backend dependencies
cd backend
npm install

# 3. Install frontend dependencies
cd ../frontend
npm install

# 4. Set up environment variables
# Create backend/.env file with:
# PORT=5000
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
# GOOGLE_MAPS_API_KEY=your_api_key

# 5. Run backend server (from /backend)
npm run dev

# 6. Run frontend (from /frontend)
npm start
Environment Variables Template
env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/wanderway
JWT_SECRET=your_super_secret_key_change_this
GOOGLE_MAPS_API_KEY=AIzaSy...
OPEN_TRIP_MAP_KEY=your_optional_key
The app will be available at http://localhost:3000

📁 Project Structure
text
WanderWay/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── tripController.js
│   │   └── destinationController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Trip.js
│   │   └── Destination.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── tripRoutes.js
│   │   └── apiRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── ItineraryCard.js
│   │   │   └── MapView.js
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   ├── Planner.js
│   │   │   └── Login.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   └── App.js
│   └── public/
└── README.md
🎮 How It Works (User Flow)
Sign Up / Log In — Create an account or log in with Google OAuth

Search Destinations — Type a city name and explore top attractions

Create a Trip — Give it a name, dates, and add friends via email

Build Itinerary — Drag activities into daily time slots

View on Map — See all your pinned locations on an interactive map

Pack & Budget — Use auto-generated checklists and expense tracker

Share & Export — Share the trip link or export as PDF

📌 Future Improvements
AI-powered itinerary generation based on preferences and budget

Flight and hotel price comparison using Skyscanner API

Offline mode — access itineraries without internet

Weather integration — auto-suggest indoor/outdoor activities

Mobile app version (React Native)

User reviews and ratings for destinations

Social feed — see where friends are traveling

Currency converter and real-time budget alerts

🐛 Known Issues
Google Maps API requires billing enabled (free tier available)

Large itineraries may cause slower load times (pagination planned)

Collaborative editing lacks real-time sync (WebSockets coming soon)

🤝 Contributing
Contributions are welcome! Here's how:

Fork the repo

Create a feature branch (git checkout -b feature/amazing-feature)

Commit changes (git commit -m 'Add amazing feature')

Push to branch (git push origin feature/amazing-feature)

Open a Pull Request

Please follow the existing code style and write tests for new features.

📄 License
Distributed under the MIT License. See LICENSE file for more information.

👩‍💻 Author
Nida Zah — CS Student & Aspiring AI Engineer
https://img.shields.io/badge/GitHub-Nidazah-181717?logo=github
https://img.shields.io/badge/LinkedIn-NidaZah-0A66C2?logo=linkedin

