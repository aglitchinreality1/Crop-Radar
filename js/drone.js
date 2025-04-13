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

const fieldBoxes = document.querySelectorAll('.field-box');
const droneStatus = document.getElementById('drone-status');
const droneActionBar = document.getElementById('drone-action-bar');
const selectedFieldText = document.getElementById('drone-selected-field');

fieldBoxes.forEach((box, index) => {
  box.addEventListener('click', () => {
    const fieldNumber = index + 1;
    droneStatus.style.display = 'none';
    droneActionBar.classList.remove('hidden');
    selectedFieldText.textContent = `Field ${fieldNumber}`;
  });
});



const problemSelector = document.getElementById('problem-selector');
const droneDisplay = document.getElementById('drone-display');
const droneImage = document.getElementById('drone-img');
const droneName = document.getElementById('drone-name');
const droneDesc = document.getElementById('drone-desc');
const deployBtn = document.getElementById('deploy-btn');
const loadingBar = document.getElementById('loading-bar');
const statusText = document.getElementById('drone-status-text');

const droneInfo = {
    "Supply water": {
      name: "Water Drone",
      image: "images/irigation.webp", // replace with real path
      desc: "Sprays water efficiently across your crops, ensuring uniform hydration even in hard-to-reach field areas. Ideal for optimizing irrigation without manual effort."
    },
    "Pesticide spray": {
      name: "Pesticide Drone",
      image: "images/pesticide.webp", // replace with real path
      desc: "Covers fields with targeted pesticide treatment, reducing chemical usage and protecting crops from pests with precision spraying."
    },
    "Scatter nutrients": {
      name: "Nutrient Drone",
      image: "images/nutrients.jpg", // replace with real path
      desc: "Scatters fertilizers or micronutrients evenly across the land, improving soil quality and promoting healthy plant growth with minimal waste."
    },
    "Remove weeds": {
      name: "Weed Drone",
      image: "images/weed.webp", // replace with real path
      desc: "Uses precision spraying to eliminate weeds without harming nearby crops. A smart and efficient alternative to manual or chemical-heavy methods."
    },
    "Survey crop health": {
      name: "Surveillance Drone",
      image: "images/camera.jpg", // replace with real path
      desc: "Captures aerial images and real-time data to assess crop health, detect diseases early, and monitor growth patterns across large fields."
    }
  };
  

problemSelector.addEventListener('change', () => {
  const selected = problemSelector.value;
  const data = droneInfo[selected];

  droneName.textContent = data.name;
  droneDesc.textContent = data.desc;
  droneImage.style.backgroundImage = data.image ? `url(${data.image})` : "none";
  droneDisplay.classList.add('visible');
});

deployBtn.addEventListener('click', () => {
  deployBtn.style.display = 'none';
  loadingBar.classList.add('show');

  let progress = 0;
  const interval = setInterval(() => {
    progress += 1;
    loadingBar.style.width = `${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);
      loadingBar.innerHTML = `<div style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        font-weight: bold;
        font-size: 1.1rem;
        width: 100%;">Drones on their way!</div>`;
    }
  }, 30);
});


fieldBoxes.forEach(box => {
  box.addEventListener('click', () => {
    // Update selected field text if you're doing that here
    document.getElementById('drone-display').classList.remove('visible');

    // Reset content
    document.getElementById('drone-name').textContent = '';
    document.getElementById('drone-desc').textContent = '';
    document.getElementById('drone-img').style.backgroundImage = 'none';

    // Reset dropdown
    problemSelector.selectedIndex = 0;

    // Reset button + loading bar
    deployBtn.style.display = 'block';
    loadingBar.classList.remove('show');
    loadingBar.style.width = '0%';
    loadingBar.textContent = '';

    // Optional: Scroll to top of the right panel or focus
    document.querySelector('.drone-select').scrollIntoView({ behavior: 'smooth' });
  });
});
