/*import React, { useState } from 'react';

function App() {
  const [city, setCity] = useState("");//change over time
  const [data, setData] = useState(null);

  const fetchData = async () => {
  try {
    const response = await fetch("http://127.0.0.1:5000/weather",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({city:city})
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setData(data);
    } else {
      console.log("Failed to fetch");
    }
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div>
      <input type="text" value={city} onChange={(e) => { setCity(e.target.value) }} />
      <button onClick={() => { fetchData(); }}>Search</button>
      <hr/>
      {data !== null ? (
        <div>
          <h2>{data.location.name}</h2>
          <h2>{data.current.temp_c} &deg;C🌡</h2>
          <h2>{data.current.condition.text === 'Sunny' ? 'Sunny ☀️' : data.current.condition.text === 'Rainy' ? ' Rainy ⛈️' : 'Mist ❄️'}</h2>
          <h2>{data.location.country}</h2>
          <h2>{data.location.localtime}</h2>
        </div>
      ) : null}
    </div>
  );
}

export default App;*/

import React,{useState} from "react";
import CountrySearch from "./CountrySearch";
import WeatherDetails from "./WeatherDet";
import City from "./City";

function App() {
  const [cities, setCities] = useState([]);
  const [weather, setWeather] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const fetchCities = async (country) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/cities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country }),
      });
      const data = await response.json();
      if (data.data) {
        setCities(data.data);
        setWeather(null); // clear previous weather
      } else {
        alert("No cities found for this country!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWeather = async (city) => {
    try {
      setSelectedCity(city);
      const response = await fetch("http://127.0.0.1:5000/weather", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city }),
      });
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error(error);
    }
  };
 return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <CountrySearch onSearch={fetchCities} />
      <City cities={cities} onCitySelect={fetchWeather} />
      <WeatherDetails data={weather} city={selectedCity} />
    </div>
  );
}
export default App;