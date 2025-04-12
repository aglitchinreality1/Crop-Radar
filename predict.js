var scanning = 0;

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
  

  const fields = document.querySelectorAll('.field-box');
  const placeholder = document.getElementById('ai-placeholder');
  const resultBox = document.getElementById('ai-result');
  const resultText = document.getElementById('selected-field-text');
  
  fields.forEach((field, index) => {
    field.addEventListener('click', () => {
      placeholder.style.display = 'none';
      resultBox.style.display = 'flex';
      resultText.textContent = `SELECTED: Field ${index + 1}`;
      scanning = 0
      const result = document.getElementById('condition-text');
      const resultTable = document.getElementById('result-table');
      resultTable.classList.add('hidden');
      result.innerText = "Result will appear here!";
      result.style.backgroundColor = "rgba(0, 0, 0, 0.367)";
      result.style.color = "rgb(0, 0, 0)"
    });
  });
  

  document.querySelector('.scan-btn').addEventListener('click', () => {
    const resultTable = document.getElementById('result-table');
    resultTable.classList.remove('hidden');
  
    const valuesRow = document.getElementById('nutrient-values');
  
    if (scanning === 0) {
      const data = {
        nitrogen: parseFloat((Math.random() * (300 - 50) + 50).toFixed(1)),
        phosphorus: parseFloat((Math.random() * (100 - 10) + 10).toFixed(1)),
        potassium: parseFloat((Math.random() * (200 - 40) + 40).toFixed(1)),
        pH: parseFloat((Math.random() * (8 - 5.5) + 5.5).toFixed(2)),
        moisture: parseFloat((Math.random() * (60 - 10) + 10).toFixed(1))
      };
  
      valuesRow.innerHTML = `
        <td>${data.nitrogen}</td>
        <td>${data.phosphorus}</td>
        <td>${data.potassium}</td>
        <td>${data.pH}</td>
        <td>${data.moisture}%</td>
      `;
  
      // Call the decision function to determine soil condition
      const condition = getSoilCondition(
        data.nitrogen,
        data.phosphorus,
        data.potassium,
        data.pH,
        data.moisture
      );
  
      // Show the result div and update the text
      const resultText = document.getElementById('condition-text');
      resultText.innerText = condition;
  
      // Change background color based on the condition
      if (condition === "Healthy") {
        resultText.style.backgroundColor = "rgba(175, 255, 55, 0.63)"; // Mild green
        resultText.style.color = "rgb(0, 0, 0)"
      } else {
        resultText.style.backgroundColor = "rgba(255, 94, 66, 0.69)"; // Mild red
        resultText.style.color = "rgb(0, 0, 0)"
      }
  
      // // Reveal the result div
      // resultBox.classList.remove('hidden-left');
  
      scanning = 1;
    }
  });
  

function getSoilCondition(nitrogen, phosphorus, potassium, ph, moisture) {
  if (phosphorus <= 39.5) {
      if (nitrogen <= 60) {
          return "Low Nitrogen";
      } else {
          return "Low Phosphorus";
      }
  } else {
      if (ph <= 7.05) {
          if (potassium <= 49.5) {
              if (nitrogen <= 59) {
                  return "Low Nitrogen";
              } else {
                  return "Low Potassium";
              }
          } else {
              if (nitrogen <= 59.5) {
                  return "Low Nitrogen";
              } else {
                  return "Healthy";
              }
          }
      } else {
          if (potassium <= 50) {
              if (moisture <= 56.5) {
                  return "Low Potassium";
              } else {
                  return "Low Nitrogen";
              }
          } else {
              if (nitrogen <= 59.5) {
                  return "Low Nitrogen";
              } else {
                  return "High pH";
              }
          }
      }
  }
}

