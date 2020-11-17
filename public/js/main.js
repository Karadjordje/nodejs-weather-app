console.log('Client side javascript file is loaded!');

const weatherForm = document.querySelector('form');
const search = weatherForm.querySelector('input');
const dataWrapper = document.getElementById('weatherData');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    fetchWeather(location);
});

const fetchWeather = async (location) => {
    const res = await fetch(`/api/weather?address=${location}`);
    const forecastData = await res.json();
    dataWrapper.innerHTML = '<p>Loading...</p>';

    if (forecastData.error) {
        const data = `<p class="error">${forecastData.error}</p>`
        dataWrapper.innerHTML = data;
        return;
    }

    const data = `<div>
        <p>${forecastData.location}</p>
        <p>${forecastData.forecast}</p>
    </div>`;

    dataWrapper.innerHTML = data;
};