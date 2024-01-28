import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import "./index.css";

export default function Trip() {
  let [url, setUrl] = useState("http://localhost:3001/trips");
  let { data: trips, loading, error } = useFetch(url, { type: "Get" });

  console.log(trips);

  return (
    <div className="container">
      {error && <p>{error}</p>}
      {!error && (
        <div className="flex-container">
          <h1>Ready to Go?</h1>
          {loading && <p>loading trips</p>}
          <div>
            <button onClick={() => setUrl("http://localhost:3001/trips")}>
              All
            </button>
            <button
              onClick={() =>
                setUrl("http://localhost:3001/trips?location=Thai")
              }
            >
              Trip to thai
            </button>
            <button
              onClick={() =>
                setUrl("http://localhost:3001/trips?location=Japan")
              }
            >
              Trip to Japan
            </button>
          </div>
          <ul className="trips-list">
            {trips &&
              trips.map((trip) => (
                <li key={trip.id} className="trip">
                  <h3>{trip.name}</h3>
                  <p>price - {trip.price} mmk</p>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
