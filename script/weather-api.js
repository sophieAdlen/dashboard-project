import axios from "axios"
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
  console.log(lat, long);
  fetchData(lat, long)
}
getLocation();
async function fetchData(lat, long) {
  const APIkey = "49a051eadf02f74befae243a2fc60996"
  const endpoint = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${APIkey}&units=metric`
  try {
    const response = await axios.get(endpoint)
    console.log(response.data.list[0].main.temp)
  }
  catch(error) {
    console.error("Error", error.message)
  }
}