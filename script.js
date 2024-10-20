// Declare global variables for the charts so we can update or destroy them later
let barChart, doughnutChart, lineChart;

document.getElementById('get-weather').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    if (city) {
        fetchWeatherData(city);
    } else {
        alert('Please enter a city name');
    }
});

function fetchWeatherData(city) {
    const apiKey= '3eba90ded8693bd9517b063caf11e62b';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayCurrentWeather(data);
                fetchForecastData(city);  // Fetch forecast data after displaying current weather
            } else {
                console.error('Error:', data.message);
                alert(`Error: ${data.message}`);
            }
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
            alert(`An error occurred: ${error.message}`);
        });
}

function displayCurrentWeather(data) {
    const weatherDetails = `
        <div>City: ${data.name}</div>
        <div>Temperature: ${data.main.temp} °C</div>
        <div>Humidity: ${data.main.humidity} %</div>
        <div>Wind Speed: ${data.wind.speed} m/s</div>
        <div>Weather: ${data.weather[0].description}</div>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">
    `;
    document.getElementById('current-weather-details').innerHTML = weatherDetails;
}

function fetchForecastData(city) {
    const apiKey= '3eba90ded8693bd9517b063caf11e62b';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '200') {
                // Check which page is loaded
                if (window.location.pathname.includes("Dashboard.html")) {
                    // For dashboard, update charts
                    displayForecast(data);
                    updateCharts(data); // Existing charts update logic
                } else if (window.location.pathname.includes("Table.html")) {
                    // For tables page, update the table
                    displayWeatherTable(data); // Call the table update function
                }
            } else {
                alert('Error fetching forecast data');
            }
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
            alert('An error occurred while fetching the forecast data. Please try again.');
        });
}

function displayForecast(data) {
    let forecastDetails = '<div class="forecast-grid">';
    data.list.forEach(item => {
        forecastDetails += `
            <div class="forecast-item">
                <div>Date: ${new Date(item.dt_txt).toLocaleDateString()}</div>
                <div>Temperature: ${item.main.temp} °C</div>
                <div>Weather: ${item.weather[0].description}</div>
                <img src="http://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="Weather Icon">
            </div>
        `;
    });
    forecastDetails += '</div>';
    document.getElementById('forecast-details').innerHTML = forecastDetails;
}

// Function to update the charts without creating new instances every time
function updateCharts(forecastData) {
    const labels = [];
    const temperatures = [];
    const weatherConditions = {};

    // Loop through forecast data to extract necessary details for charts
    forecastData.list.forEach((item, index) => {
        if (index % 8 === 0) {  // Only every 8th item to get daily data (3-hour intervals)
            const date = new Date(item.dt_txt).toLocaleDateString();
            labels.push(date);
            temperatures.push(item.main.temp);

            const condition = item.weather[0].main;
            weatherConditions[condition] = (weatherConditions[condition] || 0) + 1;
        }
    });

    // Destroy existing barChart if it exists
    if (barChart) {
        barChart.destroy();
    }

    // Create a new Bar Chart
    barChart = new Chart(document.getElementById('barChart'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: temperatures,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true, // Ensure the chart stays within its box
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            animation: {
                duration: 2000
            }
        }
    });

    // Destroy existing doughnutChart if it exists
    if (doughnutChart) {
        doughnutChart.destroy();
    }

    // Create a new Doughnut Chart for weather conditions
    doughnutChart = new Chart(document.getElementById('doughnutChart'), {
        type: 'doughnut',
        data: {
            labels: Object.keys(weatherConditions),
            datasets: [{
                data: Object.values(weatherConditions),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99,132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true, // Ensure the chart stays within its box
            animation: {
                duration: 2000
            }
        }
    });

    // Destroy existing lineChart if it exists
    if (lineChart) {
        lineChart.destroy();
    }

    // Create a new Line Chart for temperature trends
    lineChart = new Chart(document.getElementById('lineChart'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature Trend (°C)',
                data: temperatures,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true, // Ensure the chart stays within its box
            animation: {
                duration: 2000,
                easing: 'easeOutBounce'
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Declare a global variable for the weather API key
const geminiApiKey = 'AIzaSyA6ZZTPI46oShBtqcVyaYswCFxFI-at8sg';
const openWeatherApiKey = '3eba90ded8693bd9517b063caf11e62b';  // Add your OpenWeather API key

document.getElementById('chatbot-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const userQuery = document.getElementById('chatbot-input').value.trim();
        if (userQuery) {
            processChatbotQuery(userQuery);
            document.getElementById('chatbot-input').value = '';  // Clear input field
        }
    }
});

// Function to process chatbot queries
function processChatbotQuery(query) {
    if (query.toLowerCase().includes('weather')) {
        // If the user asks for weather without specifying a city, fetch their current location
        if (query.toLowerCase().includes('today')) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            const city = extractCityFromQuery(query);
            if (city) {
                fetchWeatherData(city);  // Fetch weather data if city is mentioned
                appendMessageToChat('Fetching weather information...', 'bot');
            } else {
                appendMessageToChat('Please mention a city to get the weather information.', 'bot');
            }
        }
    } else {
        fetchGeminiResponse(query);  // Use Gemini API for non-weather-related queries
    }
}

// Function to extract city name from the query
function extractCityFromQuery(query) {
    const words = query.split(' ');
    return words.find(word => word[0] === word[0].toUpperCase());  // Assuming city names start with capital letters
}

// Function to fetch weather data using geolocation
function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}&units=metric`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);  // Display weather using your existing function
            appendMessageToChat(`The current weather in your location is: ${data.weather[0].description}, ${data.main.temp}°C`, 'bot');
        })
        .catch(error => appendMessageToChat('Unable to fetch weather data. Please try again later.', 'bot'));
}

function error() {
    appendMessageToChat('Geolocation access denied. Please allow access to your location or enter a city manually.', 'bot');
}

// Fetch non-weather-related queries using Gemini API
function fetchGeminiResponse(query) {
    const url = `https://api.gemini.com/ai/v1/chat?query=${encodeURIComponent(query)}&key=${geminiApiKey}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            appendMessageToChat(data.response, 'bot');
        })
        .catch(error => {
            console.error('Error fetching Gemini API response:', error);
            appendMessageToChat('An error occurred while fetching the chatbot response.', 'bot');
        });
}

// Function to append messages to the chatbot UI
function appendMessageToChat(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
    messageElement.textContent = message;
    document.getElementById('chatbot-messages').appendChild(messageElement);
}

// Variables for Table Pagination
let currentPage = 1;
const rowsPerPage = 10; // Show 10 entries per page
let weatherData = []; // Store fetched forecast data

// Function to display weather forecast in a table with pagination
function displayWeatherTable(data) {
    weatherData = data.list; // Store the entire list of weather data
    updateTable(); // Update the table with the first set of data
}

// Function to update the table based on the current page
function updateTable() {
    const tableBody = document.getElementById('table-body'); // Corrected ID
    tableBody.innerHTML = ''; // Clear previous entries

    // Calculate the starting and ending index for the current page
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    // Loop through the weather data for the current page
    for (let i = start; i < end && i < weatherData.length; i++) {
        const item = weatherData[i];
        const row = `
            <tr>
                <td>${new Date(item.dt_txt).toLocaleDateString()}</td>
                <td>${item.main.temp} °C</td>
                <td>${item.weather[0].description}</td>
                <td>${item.main.humidity} %</td>
                <td>${item.wind.speed} m/s</td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
    }

    // Update pagination controls
    document.getElementById('page-info').textContent = `Page ${currentPage} of ${Math.ceil(weatherData.length / rowsPerPage)}`;
}

// Event listeners for pagination buttons
document.getElementById('next-page').addEventListener('click', () => {
    if (currentPage * rowsPerPage < weatherData.length) {
        currentPage++;
        updateTable();
    }
});

document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updateTable();
    }
});



