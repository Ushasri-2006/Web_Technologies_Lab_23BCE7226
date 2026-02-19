const apiKey = "f8dd8741a22ee62e2e02bb3419594362";  // 🔥 Replace this

const loading = document.getElementById("loading");
const resultDiv = document.getElementById("weatherResult");

let lastCity = "";
let cachedData = null;

function getWeather() {
    const city = document.getElementById("cityInput").value.trim();

    if (city === "") {
        resultDiv.innerHTML = "<p class='error'>Please enter a city name</p>";
        return;
    }

    // Check Cache
    if (city.toLowerCase() === lastCity.toLowerCase() && cachedData) {
        displayWeather(cachedData);
        return;
    }

    loading.style.display = "block";
    resultDiv.innerHTML = "";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found (404)");
            }
            return response.json();
        })
        .then(data => {
            loading.style.display = "none";

            // Cache result
            lastCity = city;
            cachedData = data;

            displayWeather(data);
        })
        .catch(error => {
            loading.style.display = "none";
            resultDiv.innerHTML = "<p class='error'>Invalid city or network error</p>";
        });
}

function displayWeather(data) {
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const condition = data.weather[0].description;

    resultDiv.innerHTML = `
        <div class="success">
            <h3>${data.name}</h3>
            <p><strong>Temperature:</strong> ${temperature} °C</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Condition:</strong> ${condition}</p>
        </div>
    `;
}
