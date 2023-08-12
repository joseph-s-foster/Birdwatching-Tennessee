document.addEventListener("DOMContentLoaded", async () => {
  const apikey = "7761e5644bf2af39970d6760ed459312";

  const fetchWeatherData = async (url) => {
    try {
      const response = await fetch(url);
      if (response.ok) return await response.json();
      throw new Error("Network response was not ok.");
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null;
    }
  };

  const isGreatWeatherForBirdwatching = (currentWeatherData) => {
    const { weather, main } = currentWeatherData;
    const isRaining = weather.some((item) => item.main === "Rain");
    const temperature = main.temp;
    const currentHour = new Date().getHours();

    let message;

    if (temperature <= 32) {
      message = "Brrr... what are you expecting to find out there, penguins?";
    } else if (temperature >= 80) {
      message = "Beat the heat! Bring a water source.";
    } else if (isRaining) {
      message = "Bring an umbrella, maybe one for the birds too.";
    } else if (currentHour >= 19 || currentHour < 6) {
      message = "Shhh... The birds are sleeping.";
    } else {
      message = "Great weather for birdwatching today!";
    }

    displayMessage(message);
  };

  const displayMessage = (message) => {
    const messageElement = document.createElement("p");
    messageElement.textContent = message;
    messageElement.classList.add("message", "is-info");

    const headerElement = document.querySelector("header");
    headerElement.appendChild(messageElement);
  };

  const getLocationAndFetchWeather = async () => {
    try {
      const success = (position) => {
        const { latitude, longitude } = position.coords;
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apikey}&lat=${latitude}&lon=${longitude}&units=imperial`;

        fetchWeatherData(weatherUrl).then((currentWeatherData) => {
          if (currentWeatherData && isGreatWeatherForBirdwatching(currentWeatherData)) {
            createModal();
          }
          console.log("Current Weather Data:", currentWeatherData);
        });
      };

      const error = () => {
        console.error("Unable to retrieve location.");
      };

      navigator.geolocation.getCurrentPosition(success, error);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  getLocationAndFetchWeather();

  const elementsWithClass = (selector, classNames) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      element.classList.add(...classNames);
    });
  };

  elementsWithClass('section', ['block', 'section']);
  elementsWithClass('p', ['card-content']);
});

document.addEventListener("DOMContentLoaded", async () => {
  const apiKey = 'q9iu7en5gq8d'; 
  const apiUrl = 'https://api.ebird.org/v2/ref/hotspot/TN';
  const cardContainer = document.getElementById('card-container'); 

  console.log("Page loaded");

  // Function to fetch recent birdwatching hotspot data from eBird API
  const fetchBirdHotspotData = async () => {
    try {
      console.log("Fetching bird hotspot data...");
      const response = await fetch(apiUrl, {
        headers: {
          'X-eBirdApiToken': apiKey
        }
      });

      if (response.ok) {
        const csvData = await response.text(); // Get the response body as text
        console.log("Bird hotspot data fetched successfully:", csvData);
        return csvData;
      }

      throw new Error("Network response was not ok.");
    } catch (error) {
      console.error("Error fetching bird hotspot data:", error);
      return null;
    }
  };

  // Function to create and append observation cards
  const createObservationCard = (data) => {
    const card = document.createElement('div');
    card.className = 'observation-card';
    card.innerText = data; // You can customize this to format the data nicely

    cardContainer.appendChild(card);
  };

  // Fetch bird hotspot data and create observation cards
  const loadBirdHotspotData = async () => {
    console.log("Loading bird hotspot data...");
    const birdHotspotData = await fetchBirdHotspotData();
    if (birdHotspotData) {
      console.log("Bird hotspot data loaded:", birdHotspotData);
      const lines = birdHotspotData.split('\n');
      lines.forEach(line => {
        // Create and append an observation card for each line of CSV data
        createObservationCard(line);
      });
    }
  };

  // Call the loadBirdHotspotData function when the page loads
  loadBirdHotspotData();
});
