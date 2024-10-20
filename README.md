Weather App
A web application that displays current weather and a 5-day weather forecast for any city using the OpenWeatherMap API. The app includes two main features: a dashboard with weather data visualized as charts and a table view to display weather forecasts in a tabular format with pagination.

Table of Contents
Overview
Features
Installation
Usage
File Structure
API Key Setup
Known Issues
License
Overview
This project provides a weather forecasting web app that allows users to check the weather for any city around the world. It integrates with the OpenWeatherMap API to fetch real-time weather information and display it on the user interface.

Features
Dashboard: Displays the current weather and a 5-day forecast in a graphical format, including bar, line, and doughnut charts.
Table View: Provides a tabular view of the 5-day weather forecast with pagination.
Search Functionality: Users can search for weather information by entering the name of a city.
Responsive Design: Works well on various screen sizes (desktop, tablet, and mobile).
Geolocation Support: Users can get weather updates for their current location.
Pagination: The table view of the weather forecast supports pagination, showing 10 results per page.

Installation Prerequisites
Before you begin, ensure you have met the following requirements:

You need a modern web browser such as Google Chrome, Firefox, Safari, etc.
You need a valid OpenWeatherMap API key (available for free at OpenWeatherMap).

Steps
Clone the repository to your local machine:

bash
git clone https://github.com/your-repository/weather-app.git
Navigate to the project directory:

bash
cd weather-app
Open the index.html (or Dashboard.html and Table.html pages) in your browser to launch the app.

Usage
1. Dashboard Page
On the Dashboard page, you can enter the name of a city in the search bar and click the Get Weather button.
The dashboard displays the current weather as well as the 5-day forecast in the form of bar, line, and doughnut charts.
2. Table Page
On the Tables page, you can enter a city name and view the 5-day weather forecast in a tabular format.
Use the Next and Previous buttons to navigate through the weather data using pagination.

File Structure
weather-app/
│
├── index.html               # Home page of the app
├── Dashboard.html           # Weather dashboard with chart visualizations
├── Table.html               # Weather forecast table with pagination
├── style.css                # Common stylesheet for styling
├── style2.css               # Stylesheet specific for the Table page
├── script.js                # JavaScript file that handles API calls and UI updates
├── README.md                # This README file
└── assets/                  # Directory containing images, icons, etc.

API Key Setup
The application requires an OpenWeatherMap API key to fetch weather data.

To set up your API key:

Get your API key by signing up at OpenWeatherMap.

In the script.js file, replace the placeholder API key (3eba90ded8693bd9517b063caf11e62b) with your own API key:

const apiKey = 'YOUR_API_KEY_HERE';
Save the file and reload the application.

Known Issues
Null Element Error: If you encounter a Cannot set properties of null error in the console, ensure that all the necessary DOM elements (e.g., #table-body) are properly defined in the HTML file and that the script.js file is correctly linked in your HTML using defer.

Forecast Data Pagination: If the table pagination is not working as expected, check if the data fetched from the API is correctly formatted and passed to the updateTable() function.

API Limits: The free tier of the OpenWeatherMap API may limit the number of requests you can make per minute. You may encounter issues if you exceed this limit.

Thank you for using the Weather App!
If you have any questions or feedback, feel free to reach out.