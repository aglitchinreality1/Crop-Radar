// Show system time
function updateTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString();
    document.getElementById('time').textContent = `⏰ ${timeStr}`;
  }
  setInterval(updateTime, 1000);
  updateTime();
  
  // Hardcoded weather for Chennai
  const chennaiLat = 13.0827;
  const chennaiLon = 80.2707;
  
  function fetchWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const temp = data.current_weather.temperature;
        const wind = data.current_weather.windspeed;
        document.getElementById('weather').textContent = `🌡️ ${temp}°C | 💨 ${wind} km/h`;
      })
      .catch(() => {
        document.getElementById('weather').textContent = "🌤️ Weather unavailable";
      });
  }
  
  fetchWeather(chennaiLat, chennaiLon);
  