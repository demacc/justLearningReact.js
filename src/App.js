import React, { useState } from "react";
import TripList from "./components/trip/index.js";

export default function App() {
  let [show, setShow] = useState(true);
  return (
    <div>
      <button onClick={() => setShow(false)}> Hide Trips</button>
      {show && <TripList />}
    </div>
  );
}
