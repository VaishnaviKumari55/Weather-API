// script.js
document.addEventListener('DOMContentLoaded', () => {
    const countriesGrid = document.getElementById('countries-grid');
    const modal = document.getElementById('weather-modal');
    const modalTitle = document.getElementById('modal-title');
    const temperature = document.getElementById('temperature');
    const condition = document.getElementById('condition');
    const closeModal = document.getElementById('close-modal');
    const closeWeatherBtn = document.getElementById('close-weather-btn');
  
    // Fetch country data
    fetch('https://restcountries.com/v2/all')
      .then(response => response.json())
      .then(countries => {
        countries.forEach(country => {
          const card = document.createElement('div');
          card.className = 'country-card';
          card.innerHTML = `
            <h2>${country.name}</h2>
            <img src="${country.flag}" alt="${country.name} flag">
            <p>Capital: ${country.capital || 'N/A'}</p>
            <p>Region: ${country.region}</p>
            <p>Country Code: ${country.alpha3Code}</p>
            <button data-capital="${country.capital}" class="weather-btn">Click for Weather</button>
          `;
          countriesGrid.appendChild(card);
        });
  
        // Add event listeners to weather buttons
        document.querySelectorAll('.weather-btn').forEach(button => {
          button.addEventListener('click', (e) => {
            const capital = e.target.getAttribute('data-capital');
            if (capital) {
              fetchWeather(capital);
            }
          });
        });
      });
  
    // Fetch weather data
    function fetchWeather(city) {
      const apiKey = '752e752dfdd4738799555a1bf556c57e'; // Your OpenWeather API key
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(weather => {
          modalTitle.textContent = `Weather in ${city}`;
          temperature.textContent = `Temperature: ${(weather.main.temp - 273.15).toFixed(2)}°C`;
          condition.textContent = `Condition: ${weather.weather[0].description}`;
          modal.classList.remove('hidden');
        })
        .catch(() => {
          modalTitle.textContent = `Error`;
          temperature.textContent = `Unable to fetch weather data.`;
          condition.textContent = '';
          modal.classList.remove('hidden');
        });
    }
  
    // Close modal when "X" or "Close" button is clicked
    closeModal.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  
    closeWeatherBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  });
  