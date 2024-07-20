// src/components/FlightSearch.js
import React, { useState } from "react";
import axios from "axios";
import "./flightsearch.css";

const FlightSearch = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [cabin, setCabin] = useState("economy");
  const [flights, setFlights] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/flights", {
        params: { origin, destination, cabin },
        
      });
      console.log("response",response)
      if (response.data.length === 0) {
        setErrorMessage("Try another search route.");
      } else {
        setErrorMessage("");
        setFlights(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching flights:", error);
      setErrorMessage("Error fetching flights. Please try again later.");
    }
  };

  return (
    <div className="flight-search">
      <h1>Choose Origin & Destination Airports:</h1>
      <div className="form-group">
        <label>Origin:</label>
        <select value={origin} onChange={(e) => setOrigin(e.target.value)}>
          <option value="SYD">SYD</option>
          <option value="JFK">JFK</option>
          <option value="DEL">DEL</option>
          <option value="BOM">BOM</option>
          <option value="BNE">BNE</option>
          <option value="BLR">BLR</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="form-group">
        <label>Destination:</label>
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        >
          <option value="JFK">JFK</option>
          <option value="DEL">DEL</option>
          <option value="SYD">SYD</option>
          <option value="CDG">CDG</option>
          <option value="DOH">DOH</option>
          <option value="SIN">SIN</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="form-group">
        <label>Cabin Selection:</label>
        <select value={cabin} onChange={(e) => setCabin(e.target.value)}>
          <option value="economy">Economy</option>
          <option value="BUSINESS">BUSINESS</option>
          <option value="FIRST">FIRST</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <button onClick={handleSearch}>Search</button>

      {errorMessage ? (
        <div className="error-message">{errorMessage}</div>
      ) : (
        <div className="flights">
          {flights.map((flight, index) => (
            <div className="flight-card" key={index}>
              <h2>{flight.partner_program}</h2>
              <p>Business Miles: {flight.min_business_miles || "N/A"}</p>
              <p>Business Tax: {flight.min_business_tax || "N/A"}</p>
              <p>Economy Miles: {flight.min_economy_miles}</p>
              <p>Economy Tax: {flight.min_economy_tax}</p>
              <p>First Miles: {flight.min_first_miles || "N/A"}</p>
              <p>First Tax: {flight.min_first_tax || "N/A"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlightSearch;
