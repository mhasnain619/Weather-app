const input = document.getElementById('input')
const showWeather = document.getElementById('showWeather')


const API_KEY = '57bc8deb70bc5dba3ef3004e0568c827'

const searchData = async () => {
    if (!input.value) {
        showWeather.innerHTML = `<p style="margin-top: 50px;">Please enter a city name</p>`;
    } else {
        showWeather.innerHTML = `
         <div class="spinner-border mt-5 text-dark" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`;
        try {
            const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${API_KEY}&units=metric`;
            const fetchData = await fetch(API_URL);
            input.value = ''

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
            console.log(data);

            return showData(data);
        } catch (error) {
            showWeather.innerHTML = `<p style="margin-top: 50px;">Unable to fetch weather data. Please check your internet connection and try again.</p>`;
            console.error("Error fetching data:", error);
        }
    }
};


const showData = (data) => {
    showWeather.innerHTML = `
<div class="weather-body">
           <div class='weatherImg'>
            <img height='100%' width='100%' src=${`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="Weather Icon">
           </div>
            <div class="weather-box">
                <p id="cityName">${data.name}</p>
                <p class="temperature">🌡️ Temperature: <span>${data.main.temp}°C</span></p>
                <p class="description"></p>
            </div>
            <div class="weather-detail">
                <div class="humidity">
                    <i class="fa-solid fa-droplet"></i>
                    <div class="text">
                        <span id="humidity">${data.main.humidity}%</span>
                        <p>humidity</p>
                    </div>
                </div>
                <div class="wind">
                    <i class="fa-solid fa-wind"></i>
                    <div class="text">
                        <span id="wind-speed">${data.wind.speed}km/H</span>
                        <p>Wind Speed</p>
                    </div>
                </div>
            </div>
        </div>
        
        `

}