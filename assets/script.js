document.addEventListener("DOMContentLoaded", async () => {
  // API key here
  const apikey = "7761e5644bf2af39970d6760ed459312";

  // Function to fetch weather data
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

  // Display modal on page load
  const isGreatWeatherForBirdwatching = (currentWeatherData) => {
    const { weather, main } = currentWeatherData;
    const isRaining = weather.some((item) => item.main === "Rain");
    const temperature = main.temp;
    const currentHour = new Date().getHours();

    let message;

    if (temperature < 32) {
      message = "Brrr... what are you expecting to find out there, penguins?";
    } else if (currentHour >= 20 || currentHour < 6) {
      message = "The birds are sleeping. You should be too!";
    } else {
      message = "Great weather for birdwatching today!";
    }

    createModal(message);
  };

  // Display modal on page load
  const createModal = (message) => {
    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal", "is-active");

    const modalBackground = document.createElement("div");
    modalBackground.classList.add("modal-background");

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content", "has-text-centered");

    const modalMessage = document.createElement("p");
    modalMessage.textContent = message;
    modalContent.appendChild(modalMessage);

    const modalCloseButton = document.createElement("button");
    modalCloseButton.classList.add("modal-close", "is-large");
    modalCloseButton.setAttribute("aria-label", "close");
    modalContent.appendChild(modalCloseButton);

    // Close modal when close button is clicked
    const closeModal = () => {
      modalContainer.classList.remove("is-active");
    };

    modalCloseButton.addEventListener("click", closeModal);

    modalContainer.appendChild(modalBackground);
    modalContainer.appendChild(modalContent);

    document.body.appendChild(modalContainer);
  };

  // Get user's location and fetch weather data
  const getLocationAndFetchWeather = async () => {
    try {
      // Get user's location
      const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Fetch weather data for the user's location
        fetchWeatherData(
          `https://api.openweathermap.org/data/2.5/weather?appid=${apikey}&lat=${latitude}&lon=${longitude}&units=imperial`
        ).then((currentWeatherData) => {
          if (currentWeatherData) {
            if (isGreatWeatherForBirdwatching(currentWeatherData)) {
              createModal();
            }
            // You can do any processing with the fetched data here if needed
            console.log("Current Weather Data:", currentWeatherData);
          }
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

  // Call the getLocationAndFetchWeather function when the page loads
  getLocationAndFetchWeather();
});
  // Get all the section elements by their IDs
  const sections = document.querySelectorAll('section');

  // Loop through each section and add the "block" class
  sections.forEach(section => {
    section.classList.add('block', 'section');
  });

  const paragraphs = document.querySelectorAll('p');

  // Loop through each section and add the "card-content" class
  paragraphs.forEach(paragraph => {
    paragraph.classList.add('card-content');
  });
