// Background images for the slideshow
const backgroundImages = [
    'img2.jpg', // Replace with actual image URLs
    'img10.jpg',
    'img11.jpg',
    'img9.jpg',
    'img8.jpg',
    'img7.jpg'
];

let currentImageIndex = 0; // To keep track of the current image

// Function to change the background image
function changeBackground() {
    document.body.style.backgroundImage = `url('${backgroundImages[currentImageIndex]}')`;
    currentImageIndex = (currentImageIndex + 1) % backgroundImages.length; // Move to the next image
}

// Start the slideshow
setInterval(changeBackground, 5000); // Change image every 5 seconds

// Function to fetch weather data and local time
function getWeather() {
    const city = document.getElementById('city-input').value; // Get the city from input
    const apiKey = 'cad64a3cc3001650aa739ac08a4de024';  // Replace with your OpenWeatherMap API key
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const temperature = data.main.temp;
                const humidity = data.main.humidity;
                const weatherDescription = data.weather[0].description;

                // Get the timezone directly from the data
                const timezone = data.timezone; // This is in seconds from UTC
                const localTime = new Date(Date.now() + timezone * 1000).toLocaleTimeString(); // Calculate local time

                document.getElementById('weather-result').innerHTML = `
                    <p>City: ${city}</p>
                    <p>Temperature: ${temperature}°C</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Weather: ${weatherDescription}</p>
                    <p>Local Time: ${localTime}</p>
                `;
            } else {
                document.getElementById('weather-result').innerHTML = `<p>City not found!</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('weather-result').innerHTML = `<p>Error fetching weather data. Please try again later.</p>`;
        });
}

// Get the button and input elements
const changeBgBtn = document.getElementById('change-bg-btn');
const cityInput = document.getElementById('city-input');

// Add event listener for button click
changeBgBtn.addEventListener('click', () => {
    getWeather(); // Call the getWeather function on button click
});

// Add event listener for Enter key press
cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { // Check if the pressed key is Enter
        getWeather(); // Call the getWeather function
    }
});

// Initialize the background slideshow when the page loads
changeBackground(); // Set the initial background image
