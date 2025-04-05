# 🌐 CryptoWeather Nexus Dashboard

A real-time dashboard integrating cryptocurrency markets, global weather data, and crypto news feeds. Built with Next.js 13+ and modern web technologies.

[![Live Demo](https://img.shields.io/badge/Live_Demo-000?style=for-the-badge&logo=vercel&logoColor=white)](https://userlogy-assignment.vercel.app)  
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/akshayyy22/CryptoWeather-Nexus.git)

---

## 📌 Project Overview

**Goal:**  
Create and publicly deploy a dashboard that combines three domains:  

- **Weather Insights** — Real-time data for major cities (London, New York, Tokyo)  
- **Cryptocurrency Stats** — Live prices, 24h change, and market caps  
- **Crypto News** — Headlines from reputable sources  

**Duration:** Completed in 2 days  

---

## 🛠 Tech Stack

| Tool                  | Purpose                            |
|-----------------------|-------------------------------------|
| **Next.js 13+**       | App architecture and routing       |
| **React (Hooks)**     | State management and lifecycle     |
| **Redux + Thunk**     | Global state and async handling    |
| **Tailwind CSS**      | Styling and responsiveness         |
| **CoinCap API/WebSocket** | Live crypto prices and alerts |
| **Open-Meteo API**    | Weather information                |
| **CryptoPanic API**   | Crypto news headlines              |

---

## ✨ Features

### 📊 Dashboard (Multi-section)
- **Weather Section:** Temperature, humidity, and condition cards for New York, London, and Tokyo.
- **Cryptocurrency Section:** BTC, ETH, and SOL — with live updates, price charts, and market metrics.
- **News Section:** Top 5 latest crypto news headlines.

### 🔍 Detail Pages
- `/weather/[city]`: Historical charts, graphs, and trends.
- `/crypto/[coin]`: Extended market metrics and historical performance.

### 🔔 Real-Time Notifications
- Connected to CoinCap WebSocket.
- Instant alerts for price spikes or simulated weather events (`price_alert`, `weather_alert`).
- Toast-style UI with contextual coloring.

### 🌐 Routing & SSR
- Deep linking enabled (`/crypto/bitcoin`, `/weather/london`).
- Pre-rendered pages with static generation and on-demand rehydration.

### 📱 Responsive Design
- Seamless UI from mobile to widescreen desktops.
- Interactive elements with hover/focus states.

### ❤️ Favorites Feature
- Mark cities and coins as favorites.
- Persisted globally using Redux and visually highlighted.

---

## ⚙️ API Integrations

| Type         | Source                         | Notes                          |
|--------------|--------------------------------|--------------------------------|
| Weather      | [Open-Meteo API](https://open-meteo.com) | Real-time data for 3 cities   |
| Crypto Data  | [CoinCap + CoinGecko](https://coincap.io) | Live price + backup           |
| News         | [CryptoPanic API](https://cryptopanic.com) | Top 5 headlines               |
| WebSocket    | [CoinCap WS](https://docs.coincap.io/) | BTC/ETH live price feed       |

---

## 💡 Challenges Faced & Solutions

### 1. WebSocket Integration Delays
- **Problem:** CoinCap WebSocket delayed initial payload delivery.
- **Solution:** Fallback mechanism using REST fetch to instantly populate data while waiting for socket stream.

### 2. Inconsistent API Structures
- **Problem:** CoinCap and CoinGecko JSON schemas differ slightly, making direct switching hard.
- **Solution:** Created abstraction functions (`normalizeCoinData()`) to transform various formats into a unified Redux-compatible structure.

### 3. Partial API Failures
- **Problem:** API rate limits or failures caused broken components.
- **Solution:** Introduced fallback UIs with loading/error states and cached previous results using local storage.

---

## 🚀 Deployment

- **Platform:** Vercel  
- **Env Vars:** Managed via `.env.local` file for API keys  

---

## 📂 Repository Structure
/app
  /components
    /WeatherCard
    /CryptoCard
    /NewsCard
    /NotificationToast
  /pages
    /index.tsx
    /weather/[city].tsx
    /crypto/[coin].tsx
  /store
    reduxSlices.ts
    websocketHandler.ts
  /api
    weather.ts
    crypto.ts
    news.ts
/public
  /icons
  favicon.ico
/styles
  tailwind.config.js
.env.local
README.md


---

## 📚 Resources Used

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [CoinCap WebSocket Docs](https://docs.coincap.io/)
- [Open-Meteo API](https://open-meteo.com)
- [CoinGecko API](https://www.coingecko.com/en/api)
- [CryptoPanic API](https://cryptopanic.com)

---

## ✉️ Contact Information

Created by Akshay Esackimuthu  
Email: akshayesackimuthu@gmail.com  
LinkedIn: [linkedin.com/in/akshay-esackimuthu](https://linkedin.com/in/akshay-esackimuthu)  
GitHub: [github.com/akshayyy22](https://github.com/akshayyy22)
