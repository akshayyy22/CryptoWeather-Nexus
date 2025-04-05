# 🚀 CryptoWeather Nexus

A **modern multi-page dashboard** integrating live **cryptocurrency data**, **weather information**, and **real-time notifications** using **Next.js**, **Redux**, and **WebSocket**. Designed for responsiveness, scalability, and rich user interaction.

---

## 📌 Project Overview

**Goal:**  
Create and publicly deploy a dashboard that combines three domains:

- 📍 **Weather Insights** — Real-time data for major cities  
- 💰 **Cryptocurrency Stats** — Live prices, 24h change, and market caps  
- 📰 **Crypto News** — Headlines from reputable sources  

**Duration:** 2 Days  
**Live URL:** [https://cryptoweather.vercel.app](https://cryptoweather.vercel.app)  
**GitHub Repository:** [github.com/yourusername/cryptoweather-nexus](https://github.com/yourusername/cryptoweather-nexus)

---

## 🛠️ Tech Stack

| Tool             | Purpose                            |
|------------------|-------------------------------------|
| **Next.js 13+**   | App architecture and routing        |
| **React (Hooks)**| State management and lifecycle       |
| **Redux + Thunk**| Global state and async handling      |
| **Tailwind CSS** | Styling and responsiveness           |
| **CoinCap API/WebSocket** | Live crypto prices and alerts |
| **OpenWeatherMap API** | Weather information            |
| **NewsData.io API** | Crypto news headlines            |

---

## 🧩 Features

### 📊 Dashboard (Multi-section)
- **Weather Section:** Temperature, humidity, and condition cards for New York, London, and Tokyo.
- **Cryptocurrency Section:** BTC, ETH, and SOL — with live updates, price charts, and market metrics.
- **News Section:** Top 5 latest crypto news headlines.

### 🔍 Detail Pages
- **/weather/[city]:** Historical charts, graphs, and trends.
- **/crypto/[coin]:** Extended market metrics, historical performance.

### 🔔 Real-Time Notifications
- Connected to CoinCap WebSocket.
- Instant alerts for price spikes and simulated weather events (type-tagged: `price_alert`, `weather_alert`).
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
| Weather      | [OpenWeatherMap](https://openweathermap.org/api) | 3-city data, fallback ready |
| Crypto Data  | [CoinCap](https://coincap.io) + [CoinGecko](https://www.coingecko.com/en/api) | Live price + backup |
| News         | [NewsData.io](https://newsdata.io/) | 5-top headlines               |
| WebSocket    | [CoinCap WS](https://docs.coincap.io/) | BTC/ETH live price feed       |

---

## 💡 Challenges Faced & Solutions

### 1. **WebSocket Integration Delays**
- **Problem:** CoinCap WebSocket delayed initial payload delivery.
- **Solution:** Fallback mechanism using REST fetch to instantly populate data while waiting for socket stream.

### 2. **Inconsistent API Structures**
- **Problem:** CoinCap and CoinGecko JSON schemas differ slightly, making direct switching hard.
- **Solution:** Created abstraction functions (`normalizeCoinData()`) to transform various formats into a unified Redux-compatible structure.

### 3. **Simulated Weather Alerts**
- **Problem:** No real-time weather WebSocket API.
- **Solution:** Injected simulated alerts via Redux actions at intervals, tagged as `weather_alert`.

### 4. **Partial API Failures**
- **Problem:** API rate limits or failures caused broken components.
- **Solution:** Introduced fallback UIs with loading/error states and cached previous results using local storage.

---

## 🧪 Optional Enhancements

- Unit tests for:
  - Redux reducers (favorites, alert handler).
  - WebSocket message parsing.
- Dark Mode toggle using Tailwind + context.

---

## 🚀 Deployment

- **Platform:** [Vercel](https://vercel.com/)  
- **Env Vars:** Managed via `.env.local` file for API keys.

---

## 📂 Repository Structure

```
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
```

---

## 📚 Resources Used

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [CoinCap WebSocket Docs](https://docs.coincap.io/)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [CoinGecko API](https://www.coingecko.com/en/api)
- [NewsData.io](https://newsdata.io/)

---

## ✉️ Submission Summary

- ✅ Public Deployed App  
- ✅ GitHub with commit history  
- ✅ Structured README + Documentation  
- ✅ Summary of technical challenges + solutions  
