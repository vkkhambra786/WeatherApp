import React, { useEffect, useState } from "react";

import axios from "axios";
import sun from "../imges/sun.png";
import moon from "../imges/moon.png";
// import ClipLoader from "react-spinners/ClipLoader";
import { PushSpinner } from "react-spinners-kit";

export const WeatherViewer = ({ cityData }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setData(null);
    setLoading(true);
    axios
      .get(
        `http://dataservice.accuweather.com/currentconditions/v1/${cityData.Key}?apikey=ICfOrVGI3ofdnGODMlLrRMwyPbISOCdO`
      )
      .then((res) => {
        console.log("res -", res);
        setData(res.data[0]);
        setLoading(false);
      });
  }, [cityData.Key]);

  return (
    <React.Fragment>
      {data && (
        <main className="current-conditions-box">
          <h3 className="city-country">
            {cityData.EnglishName} {cityData.Country.EnglishName}
          </h3>
          <div className="details">
            <h2 className="temperature-value">
              {Math.ceil(data.Temperature.Metric.Value)}
              <sup className="deg">&deg;{data.Temperature.Metric.Unit}</sup>
            </h2>
            {data.IsDayTime === true ? (
              <img className="weather-img" src={sun} alt="sun" />
            ) : (
              <img className="weather-img" src={moon} alt="moon" />
            )}
            <p className="weather-text">{data.WeatherText}</p>
          </div>
        </main>
      )}
      {!data && (
        <div className="loader-box">
          {/* <ClipLoader color="#fff" loading={loading} size={50} /> */}
          <PushSpinner size={30} color="#fff" loading={loading} />
        </div>
      )}
    </React.Fragment>
  );
};
