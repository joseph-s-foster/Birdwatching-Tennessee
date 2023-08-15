const apikey = "7761e5644bf2af39970d6760ed459312";

const fetchWeatherData = async url => {
  try {
    const response = await fetch(url);
    if (response.ok) return await response.json();
    throw new Error("Network response was not ok.");
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

const weatherIcons = {
  clear: "\u2600",
  cloud: "\u2601",
  rain: "\u2614",
  storm: "\u1F329",
  default: "\u1F321"
};

const displayMessage = message => {
  const messageElement = Object.assign(document.createElement("p"), {
    textContent: message,
    classList: ["message", "is-info"],
    style: "background-color: #333; color: white;"
  });
  document.querySelector(".weather").textContent = ""; // Clear previous messages
  document.querySelector(".weather").appendChild(messageElement);
};

const getLocationAndFetchWeather = async () => {
  try {
    const success = position => {
      const { latitude, longitude } = position.coords;
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apikey}&lat=${latitude}&lon=${longitude}&units=imperial`;

      fetchWeatherData(weatherUrl)
        .then(currentWeatherData => {
          if (currentWeatherData) {
            const { weather, main, name } = currentWeatherData;
            const desc = weather[0]?.description || "";
            const icon = weatherIcons[Object.keys(weatherIcons).find(key =>
              desc.includes(key)
            )] || weatherIcons.default;
            const wholeTemp = main.temp.toFixed(0);
            const message = `${icon} ${wholeTemp}°F - ${name}`;
            displayMessage(message);
          }
          console.log("Current Weather Data:", currentWeatherData);
        })
        .catch(error => {
          console.error("Error:", error);
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













document.addEventListener("DOMContentLoaded", getLocationAndFetchWeather);

const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
  dropdown.addEventListener('mouseenter', () => {
    dropdown.querySelector('.dropdown-menu').style.display = 'block';
  });

  dropdown.addEventListener('mouseleave', () => {
    dropdown.querySelector('.dropdown-menu').style.display = 'none';
  });
});

// Joe < 78 < Shaun

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







































document.addEventListener('DOMContentLoaded', () => {
  const saveButtons = document.querySelectorAll('.saveBtn');
  const birdSighting = document.querySelector('#bird-sighting');
  const inputField = document.querySelector('input[type="text"]');
  
  const savedInput = localStorage.getItem('userInput');
  savedInput && (inputField.value = savedInput);
  
  saveButtons.forEach(saveButton => {
    saveButton.addEventListener('click', () => {
      const userInput = inputField.value;
      if (userInput) {
        localStorage.setItem('userInput', userInput);
        birdSighting.innerHTML = "Sighting Saved";
        setTimeout(() => birdSighting.innerHTML = "", 2000);
      }
    });
  });
});




