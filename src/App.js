import axios from "axios";
import { useState } from "react";
import { Icon } from "react-icons-kit";
import { search } from "react-icons-kit/feather/search";
import { WeatherViewer } from "./Components/WeatherViewer";

function App() {
  // states
  const [citySearch, setCitySearch] = useState("");
  const [cityData, setCityData] = useState(null);

  // city search form
  const fetchCity = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=ICfOrVGI3ofdnGODMlLrRMwyPbISOCdO&q=${citySearch}`
      )
      .then((res) => {
        setCityData(res.data[0]);
        setCitySearch("");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="wrapper">
      <h1 className="headline">Check Weather API</h1>
      <form
        className="form-group custom-form"
        autoComplete="off"
        onSubmit={fetchCity}
      >
        <label>Search for a city to get weather data</label>
        <div className="search-box">
          <input
            className="form-control"
            required
            placeholder="Enter city name..."
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
          />
          <button type="submit" className="btn btn-secondary btn-sm">
            <Icon icon={search} size={22} />
          </button>
        </div>
      </form>
      {cityData && (
        <div style={{ padding: 10 + "px", width: 100 + "%" }}>
          <WeatherViewer cityData={cityData} />
        </div>
      )}
    </div>
  );
}

export default App;

// import axios from "axios";
// import React, { useState } from "react";
// import ShowTemp from "./ShowTemp";
// import "bootstrap/dist/css/bootstrap-grid.min.css";
// function App() {
//   const [city, setCity] = useState("");
//   const [data, setData] = useState({
//     description: "",
//     temp: 0,
//     temp_max: 0,
//     temp_min: 0,
//     humidity: 0,
//     sunrise: 0,
//     sunset: 0,
//     country: "",
//   });

//   const handleClick = () => {
//     //    c412e32f8374f6a87ce341d095a159f6
//     axios
//       .get(
//         `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=237b346f755f762e9d2f7bd14e75e14a`
//       )
//       .then((response) => {
//         console.log(response.data);
//         setData({
//           description: response.data.weather[0].description,
//           temp: response.data.main.temp,
//           temp_max: response.data.main.temp_max,
//           temp_min: response.data.main.temp_min,
//           humidity: response.data.main.humidity,
//           sunrise: response.data.sys.sunrise,
//           sunset: response.data.sys.sunset,
//           country: response.data.sys.country,
//         });
//       });
//   };
//   return (
//     <React.Fragment>
//       <div className="container text-center my-2">
//         <h1>Weather App Using React JS</h1>
//         <input
//           type="text"
//           className="from-control"
//           value={city}
//           onChange={(e) => {
//             setCity(e.target.value);
//           }}
//         />
//         <button
//           className="btn btn-primary mx-2"
//           type="submit"
//           onClick={handleClick}
//         >
//           get temp
//         </button>
//       </div>
//       <ShowTemp text={data}></ShowTemp>
//     </React.Fragment>
//   );
// }

// export default App;
