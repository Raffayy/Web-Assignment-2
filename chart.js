const ctxBar = document.getElementById('barChart').getContext('2d');
const ctxDoughnut = document.getElementById('doughnutChart').getContext('2d');
const ctxLine = document.getElementById('lineChart').getContext('2d');

const barChart = new Chart(ctxBar, {
    type: 'bar',
    data: {
        labels: [], 
        datasets: [{
            label: 'Dataset Label',
            data: [], 
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }, 
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 2000, 
        },
        scales: {
            y: { beginAtZero: true }
        }
    }
});


const doughnutChart = new Chart(ctxDoughnut, {
    type: 'doughnut',
    data: {
        labels: [], 
        datasets: [{
            label: 'Weather Conditions',
            data: [], 
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        animation: {
            duration: 2000, 
        }
    }
});

const lineChart = new Chart(ctxLine, {
    type: 'line',
    data: {
        labels: [], 
        datasets: [{
            label: 'Temperature (°C)',
            data: [], 
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false
        }]
    },
    options: {
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

// Function to update the Bar Chart with data
function updateBarChart(forecastData) {
    const labels = [];
    const temperatures = [];


    forecastData.list.forEach((item, index) => {
        if (index % 8 === 0) { // Assuming data is in 3-hour intervals, so every 8th item gives daily data
            const date = new Date(item.dt_txt);
            labels.push(date.toLocaleDateString()); 
            temperatures.push(item.main.temp);      
        }
    });

    const barChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: labels,  
            datasets: [{
                label: 'Temperature (°C)',
                data: temperatures, 
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2000, 
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
// Function to update the Doughnut Chart with weather conditions data
function updateDoughnutChart(forecastData) {
    const weatherConditions = {};

    forecastData.list.forEach((item) => {
        const condition = item.weather[0].main;  
        if (weatherConditions[condition]) {
            weatherConditions[condition] += 1;  
        } else {
            weatherConditions[condition] = 1;   
        }
    });

    const labels = Object.keys(weatherConditions);  
    const data = Object.values(weatherConditions);

    const doughnutChart = new Chart(ctxDoughnut, {
        type: 'doughnut',
        data: {
            labels: labels,  
            datasets: [{
                label: 'Weather Conditions',
                data: data,  
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',  
                    'rgba(54, 162, 235, 0.6)', 
                    'rgba(255, 206, 86, 0.6)', 
                    'rgba(75, 192, 192, 0.6)',  
                    'rgba(153, 102, 255, 0.6)', 
                    'rgba(255, 159, 64, 0.6)'   
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',  
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth : 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2000,  
            }
        }
    });
}

// Function to update the Line Chart with temperature data
function updateLineChart(forecastData) {
    const labels = [];
    const temperatures = [];

    forecastData.list.forEach((item, index) => {
        if (index % 8 === 0) { 
            const date = new Date(item.dt_txt);
            labels.push(date.toLocaleDateString());  
            temperatures.push(item.main.temp);     
        }
    });
    const lineChart = new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: labels,  
            datasets: [{
                label: 'Temperature (°C)',
                data: temperatures, 
                backgroundColor: 'rgba(75, 192, 192, 0.2)', 
                borderColor: 'rgba(75, 192, 192, 1)', 
                borderWidth: 2,
                fill: false,
                tension: 0.3  
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2000, 
                easing: 'easeOutBounce', 
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

