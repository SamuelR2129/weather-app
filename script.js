const weatherData = (lat, long) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=013f15af0fb67b2de426136fa1981dd8`;

  const weatherApiCall = async (url) => {
    displayLoader();
    try {
      const res = await fetch(url, {
        mode: "cors",
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  weatherApiCall(url).then((jsonData) => {
    const fahrenTemp = jsonData.main.temp;
    const temperature = Math.trunc(fahrenTemp - 273.15);
    hideLoader();
    renderWeatherData(temperature);
  });
};

const renderWeatherData = (temperature) => {
  const body = document.querySelector("body");
  const div = document.createElement("div");
  div.textContent = temperature;
  body.appendChild(div);
};

const validateForm = (event) => {
  event.preventDefault();

  const latValue = parseInt(document.forms["weather-form"]["lat"].value);
  const longValue = parseInt(document.forms["weather-form"]["long"].value);

  document.forms["weather-form"]["lat"].value = "";
  document.forms["weather-form"]["long"].value = "";

  if (typeof latValue != "number" || typeof longValue != "number") {
    alert("Please fill in a number");
    return false;
  }

  weatherData(latValue, longValue);
};

const loader = document.querySelector("#loader");
const displayLoader = () => {
  loader.classList.add("display");
};

const hideLoader = () => {
  loader.classList.remove("display");
};
