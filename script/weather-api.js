import axios from "axios";

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  fetchData(lat, long);
}

getLocation();

async function fetchData(lat, long) {
  const APIkey = "49a051eadf02f74befae243a2fc60996";  //lägg in egen api-nyckel
  const endpoint = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${APIkey}&units=metric`;

  try {
    const response = await axios.get(endpoint);
    console.log(response.data)
    console.log(response.data.city.name)
    // console.log(response.data.city.timezone)
   
    const weatherList = document.querySelector(".weatherlist");

    function createWeatherListItem(index) {
      const temperature = Math.round(response.data.list[index].main.temp) + "°C";
      const date = new Date(response.data.list[index].dt_txt).toLocaleDateString('sv-SE', { weekday: 'long' });
      const capitalizedDate = date.charAt(0).toUpperCase() + date.slice(1);
      const weatherDescription = response.data.list[index].weather[0].description;
      const weatherIcon = response.data.list[index].weather[0].icon;

      const weatherListItem = document.createElement("li");

      weatherListItem.innerHTML = `
        <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon">
        <div class="text-content">
          <p class="date">${capitalizedDate}</p> 
          <div class="secondrow">
            <p class="temperature">${temperature}</p>
            <p class="description">${weatherDescription}</p>
          </div>
        </div>
      `;
      weatherList.appendChild(weatherListItem);
    }

    // Loopa igenom önskade index (0, 8 och 16)
    const desiredIndex = [0, 8, 16];

    desiredIndex.forEach(index => {
      createWeatherListItem(index);
    });

  } catch (error) {
    console.error("Error", error.message);
  }
}
