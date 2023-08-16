const apikey = "7761e5644bf2af39970d6760ed459312";

// Fetching weather data
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

// Displaying Weather message
const displayMessage = (tempImg, message) => {
  const messageElement = Object.assign(document.createElement("p"), {
    textContent: message,
    classList: ["message"],
    style: "background-color: #333; color: white;"
  });
  document.querySelector(".weather").textContent = "";
  document.querySelector(".weather").append(tempImg, messageElement);
};

// Retrieving location and weather data via openweathermap API
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
            const tempImg = document.createElement("img");
            tempImg.src = `https://openweathermap.org/img/w/${weather[0].icon}.png`;
            const wholeTemp = main.temp.toFixed(0);
            const message = `${wholeTemp}°F - ${name}`;
            displayMessage(tempImg, message);
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
// Adding a dropdown menu to easily access desired bird
dropdowns.forEach(dropdown => {
  dropdown.addEventListener('mouseenter', () => {
    dropdown.querySelector('.dropdown-menu').style.display = 'block';
  });

  dropdown.addEventListener('mouseleave', () => {
    dropdown.querySelector('.dropdown-menu').style.display = 'none';
  });
});

document.addEventListener("DOMContentLoaded", async () => {
  const apiKey = 'q9iu7en5gq8d';
  const apiUrl = 'https://api.ebird.org/v2/data/obs/US-TN/recent';
  const cardContainer = document.getElementById('card-container');

  console.log("Page loaded");
// fetching hotspot data from eBird API
  const fetchBirdHotspotData = async () => {
    try {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const formattedDate = oneWeekAgo.toISOString().split('T')[0];

      console.log("Fetching bird hotspot data...");
      const response = await fetch(`${apiUrl}?maxDate=${formattedDate}`, {
        headers: {
          'X-eBirdApiToken': apiKey
        }
      });

      if (response.ok) {
        const jsonData = await response.json();
        console.log("Bird hotspot data fetched successfully:", jsonData);
        return jsonData;
      }

      throw new Error("Network response was not ok.");
    } catch (error) {
      console.error("Error fetching bird hotspot data:", error);
      return null;
    }
  };
  const createObservationCard = (data) => {
    const card = document.createElement('div');
    card.className = 'observation-card';
  
    // Extracts the required information from the data: common name, scientific name, Location and observation date
    const { comName, sciName, locName, obsDt } = data;
  
    // Creates a formatted card content
    const cardContent = `
      <p><strong>Common Name:</strong> ${comName}</p>
      <p><strong>Scientific Name:</strong> ${sciName}</p>
      <p><strong>Location:</strong> ${locName}</p>
      <p><strong>Observation Date:</strong> ${obsDt}</p>
    `;
  
    card.innerHTML = cardContent;
  
    cardContainer.appendChild(card);
  };
  
  const loadBirdHotspotData = async () => {
    console.log("Loading bird hotspot data...");
    const birdHotspotData = await fetchBirdHotspotData();
    if (birdHotspotData) {
      console.log("Bird hotspot data loaded:", birdHotspotData);
  
      // Loop through the last 5 observations
      const last5Observations = birdHotspotData.slice(-5);
  
      last5Observations.forEach(observation => {
        createObservationCard(observation);
      });
    }
  };
  

  loadBirdHotspotData();
});

// Adds text box for user input and save button for input.
document.addEventListener('DOMContentLoaded', () => {
  const saveButtons = document.querySelectorAll('.saveBtn');
  const birdSighting = document.querySelector('#bird-sighting');
  const textareaField = document.querySelector('textarea[name="textbox"]'); // Select the textarea element
  
  const savedInput = localStorage.getItem('userInput');
  savedInput && (textareaField.value = savedInput);
  console.log("Saved users input");
  
  saveButtons.forEach(saveButton => {
    saveButton.addEventListener('click', () => {
      const userInput = textareaField.value;
      if (userInput) {
        localStorage.setItem('userInput', userInput);
        birdSighting.innerHTML = "Sighting Saved";
        setTimeout(() => birdSighting.innerHTML = "", 2000);
      }
    });
  });
});





