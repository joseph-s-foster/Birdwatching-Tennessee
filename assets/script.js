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
    createModal(
      temperature < 32
        ? "Brrr... what are you expecting to find out there, penguins?"
        : currentHour >= 20 || currentHour < 6
        ? "The birds are sleeping. You should be too!"
        : "Great weather for birdwatching today!"
    );
  };

  const createModal = (message) => {
    const modalContainer = document.getElementById("weatherModal");
    const modalMessage = document.getElementById("modalMessage");

    modalMessage.textContent = message;
    modalContainer.classList.add("is-active");

    const closeModal = () => {
      modalContainer.classList.remove("is-active");
      modalCloseButton.removeEventListener("click", closeModal);
    };

    const modalCloseButton = document.querySelector(".modal-close");
    modalCloseButton.addEventListener("click", closeModal);

    modalContainer.addEventListener("click", (event) => {
      if (event.target === modalContainer) closeModal();
    });
  };

  const getLocationAndFetchWeather = async () => {
    try {
      const success = (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherData(
          `https://api.openweathermap.org/data/2.5/weather?appid=${apikey}&lat=${latitude}&lon=${longitude}&units=imperial`
        ).then((currentWeatherData) => {
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
 
     );



























// Get all the section elements by their IDs
const sections = document.querySelectorAll('section');

// Loop through each section and add the "block" class
sections.forEach(section => {
    section.classList.add('block', 'section');
});

const paragraphs = document.querySelectorAll('p');

// Loop through each section and add the "block" class
paragraphs.forEach(paragraph => {
    paragraph.classList.add('card-content');
});
=======
  };

  getLocationAndFetchWeather();
});
