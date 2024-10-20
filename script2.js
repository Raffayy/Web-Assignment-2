// Variables for Table Pagination
let currentPage = 1;
const rowsPerPage = 10;  // Show 10 entries per page
let weatherData = [];  // Store fetched forecast data

document.getElementById('get-weather').addEventListener('click', function () {
    const city = document.getElementById('city-input').value;
    if (city) {
        fetchWeatherData(city);
    } else {
        alert('Please enter a city name');
    }
});

function fetchWeatherData(city) {
    const apiKey = '3eba90ded8693bd9517b063caf11e62b';  // Replace with your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching current weather data');
            }
            return response.json();
        })
        .then(data => {
            if (data.cod === 200) {
                fetchForecastData(city);  // Fetch forecast data after successful current weather fetch
            } else {
                alert(`Error: ${data.message}`);
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('An error occurred while fetching the weather data. Please try again.');
        });
}

function fetchForecastData(city) {
    const apiKey = '3eba90ded8693bd9517b063caf11e62b
';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '200') {
                displayWeatherTable(data);
                
            } else {
                alert('Error fetching forecast data');
            }
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
            alert('Error fetching forecast data');
        });
}

// Function to display weather forecast in a table with pagination
function displayWeatherTable(data) {
    weatherData = data.list;  // Store the entire list of weather data
    updateTable();  // Update the table with the first set of data
}

// Function to update the table based on the current page
function updateTable() {
    const tableBody = document.getElementById('table-body'
);
    tableBody.innerHTML = '';  // Clear previous entries

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
