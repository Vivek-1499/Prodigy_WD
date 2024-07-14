document.addEventListener('DOMContentLoaded', () => {
    const getWeatherButton = document.getElementById('getWeatherButton');
    const clearButton = document.getElementById('clearButton');
    const cityInput = document.getElementById('cityInput');
    const locationName = document.getElementById('locationName');
    const weatherDetails = document.getElementById('weatherDetails');

    getWeatherButton.addEventListener('click', async () => {
        const city = cityInput.value;
        if (!city) return;

        const apiKey = 'd0acebec1f48d23f8d8a08352d3e2807';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.cod !== 200) {
                alert('City not found!');
                return;
            }

            document.getElementById('temperature').textContent = `${data.main.temp}°C`;
            document.getElementById('conditions').textContent = data.weather[0].description;
            document.getElementById('humidity').textContent = `${data.main.humidity}%`;
            document.getElementById('windSpeed').textContent = `${data.wind.speed} m/s`;

            locationName.textContent = `${data.name}, ${data.sys.country}`;
            locationName.style.display = 'block';
            weatherDetails.style.display = 'grid';
        } catch (error) {
            alert('Error fetching weather data!');
            console.error(error);
        }
    });

    clearButton.addEventListener('click', () => {
        cityInput.value = '';
        locationName.style.display = 'none';
        weatherDetails.style.display = 'none';
        document.getElementById('temperature').textContent = '';
        document.getElementById('conditions').textContent = '';
        document.getElementById('humidity').textContent = '';
        document.getElementById('windSpeed').textContent = '';
    });
});