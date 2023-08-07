document.addEventListener("DOMContentLoaded", async () => {
    // Put your API key here
    const apikey = "7761e5644bf2af39970d6760ed459312";
    const defaultCity = "Nashville"; // Set the default city here
  
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
  
    // Function to check if weather is great for birdwatching
    const isGreatWeatherForBirdwatching = (currentWeatherData) => {
      const { weather, main } = currentWeatherData;
      const isRaining = weather.some((item) => item.main === "Rain");
      const temperature = main.temp;
      return !isRaining && temperature >= 32 && temperature <= 100;
    };
    
  // Display modal on page load
    const createModal = () => {
        const modalContainer = document.createElement("div");
        modalContainer.classList.add("modal", "is-active");
    
        const modalBackground = document.createElement("div");
        modalBackground.classList.add("modal-background");
    
        const modalContent = document.createElement("div");
        modalContent.classList.add("modal-content", "has-text-centered");
    
        const modalMessage = document.createElement("p");
        modalMessage.textContent = "Great weather for birdwatching today!";
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
  
    // Fetch weather data for the default city (Nashville) on page load
    const currentWeatherData = await fetchWeatherData(
        `https://api.openweathermap.org/data/2.5/weather?appid=${apikey}&q=${defaultCity}&units=imperial`
      );
    
      if (currentWeatherData) {
        if (isGreatWeatherForBirdwatching(currentWeatherData)) {
          createModal();
        }
        // You can do any processing with the fetched data here if needed
        console.log("Current Weather Data:", currentWeatherData);
      }
    }
  );