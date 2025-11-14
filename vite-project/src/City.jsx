import React from "react";

function City({ cities, onCitySelect }) {
  if (!cities || cities.length === 0) return null;

  return (
    <div>
      <middle><h2>Select a City</h2></middle>
      <select onChange={(e) => onCitySelect(e.target.value)} defaultValue="">
        <option value="">
          -- Choose a city --
        </option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
}

export default City;

