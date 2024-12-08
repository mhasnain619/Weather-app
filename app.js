const input = document.getElementById('input')
const showWeather = document.getElementById('showWeather')


const API_KEY = '57bc8deb70bc5dba3ef3004e0568c827'

const searchData = async () => {
    if (!input.value) {
        showWeather.innerHTML = `<p style="margin-top: 50px;">Please enter a valid city name</p>`;
    } else {
        showWeather.innerHTML = `
            <div class="spinner-border mt-5 text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>`;

        try {
            const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${API_KEY}&units=metric`;
            const fetchData = await fetch(API_URL);

            // Check if the response is OK
            if (!fetchData.ok) {
                if (fetchData.status === 404) {
                    showWeather.innerHTML = `<p style="margin-top: 50px;">City not found. Please enter a valid city name.</p>`;
                } else {
                    showWeather.innerHTML = `<p style="margin-top: 50px;">An error occurred. Please try again later.</p>`;
                }
                return;
            }

            const data = await fetchData.json();
            return showData(data);
        } catch (error) {
            showWeather.innerHTML = `<p style="margin-top: 50px;">Unable to fetch weather data. Please check your internet connection and try again.</p>`;
            console.error("Error fetching data:", error);
        }
    }
};


const showData = (data) => {
    showWeather.innerHTML = `

    <div class="card weather-card">
  <div class="weather-image">
    <img src=${`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="Weather Icon">
  </div>
  <div class="card-body">
    <h2 class="location-name">${data.name}</h2>
    <p class="temperature">🌡️ Temperature: <span>${data.main.temp}°C</span></p>
    <p class="weather-main">🌤️ Weather: <span>${data.weather[0].main}</span></p>
    <p class="humidity">💧 Humidity: <span>${data.main.humidity}%</span></p>
    <p class="wind-speed">🌬️ Wind Speed: <span>${data.wind.speed} m/s</span></p>
    <p class="pressure">⏲️ Pressure: <span>${data.main.pressure} hPa</span></p>
  </div>
</div>
        
        `

}