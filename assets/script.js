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