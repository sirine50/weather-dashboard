# Weather Dashboard 🌤️

A clean, responsive, and professional weather analytics web application focused on Moroccan cities, built with vanilla JavaScript, modern CSS, and live data from Open-Meteo APIs.

## LINK
https://sirine50.github.io/weather-dashboard/

## Features

- **Live Weather Data:** Real-time temperature, wind speed, humidity, cloud cover, and pressure fetched dynamically via the [Open-Meteo API](https://open-meteo.com/).
- **Interactive Sidebar & Search:** Browse pre-configured Moroccan cities or search for *any* city worldwide using the integrated Geocoding API.
- **Dynamic Charting:** Interactive hourly weather charts with custom SVG lines and area fills for temperature, wind, humidity, and more.
- **Daily Forecasts:** Visual 5-day temperature range bars comparing min and max temperatures.
- **State Management:** Fully client-side state handling allowing users to temporarily preview searched cities or permanently add/remove them from their custom sidebar view.

## Tech Stack

- **HTML5** & **CSS3** (Custom variables, modern flexbox/grid layout, sleek dark-mode inspired design palette).
- **Vanilla JavaScript (ES6+)** with modular IIFE structure.
- **APIs:** 
  - [Open-Meteo Weather Forecast API](https://open-meteo.com/)
  - [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)

## Project Structure

```text
app
    ├── index.html      # Main application markup structure
    ├── style.css       # Complete stylesheet with custom properties
    └── script.js       # App logic, DOM rendering, and API orchestration
