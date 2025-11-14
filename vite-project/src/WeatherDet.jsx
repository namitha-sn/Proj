import React from "react";

function WeatherDetails({ data, city }) {
  if (!data) return null;

  return (
    <div >
     <h2>{data.location.name}</h2>
          <h2>{data.current.temp_c} &deg;C🌡</h2>
          <h2>{data.current.condition.text === 'Sunny' ? 'Sunny ☀️' : data.current.condition.text === 'Rainy' ? ' Rainy ⛈️' : 'Mist ❄️'}</h2>
          <h2>{data.location.country}</h2>
          <h2>{data.location.localtime}</h2>
    </div>
  );
}

export default WeatherDetails;