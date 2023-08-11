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
    } else if (temperature >= 85) {
      message = "Beat the heat! Bring a water source.";
    } else if (isRaining) {
      message = "Bring an umbrella, maybe one for the birds too.";
    } else if (currentHour >= 19 || currentHour < 6) {
      message = "Shhh... The birds are sleeping.";
    } else {
      message = "Great weather for birdwatching today!";
    }

    createModal(message);
  };

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

    const closeModal = () => {
      modalContainer.classList.remove("is-active");
    };

    modalCloseButton.addEventListener("click", closeModal);

    modalContainer.appendChild(modalBackground);
    modalContainer.appendChild(modalContent);

    document.body.appendChild(modalContainer);
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