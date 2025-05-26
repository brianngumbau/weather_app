# 🌤️ Weather App Frontend (Next.js + RippleUI)

This is the frontend for the decoupled Weather App built using **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **RippleUI**. It connects to a Laravel backend to fetch and display real-time weather and a 3-day forecast.

---

## 📦 Tech Stack

* **Framework:** Next.js 15 (with App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS + RippleUI
* **API Source:** Laravel REST backend

---

## 🧠 Features

* 🔍 Search any city
* 🌡️ Toggle °C / °F
* ☁️ Current weather icon, temp, description
* 📆 Date + City name
* 📊 3-day forecast cards
* 💨 Wind status
* 💧 Humidity progress bar
* 🔁 Real-time API data from Laravel

---

## 🚀 Getting Started

### 1. Clone this repository

```bash
git clone https://github.com/brianngumbau/weather_app
cd weather_app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

Runs at: `http://localhost:3000`

---

## 🔗 API Dependency

Make sure the Laravel backend is running at `http://127.0.0.1:8000`:

```bash
php artisan serve
```

Update URLs in `page.tsx` if using different host/port.

---

## 🧪 UI Preview

```
src/app/page.tsx
├── Search input + button
├── °C/°F toggle
├── Current weather icon + description
├── 3 forecast cards
├── Wind + Humidity sections
```

---

## 📄 License

MIT – free to use, share and remix.
