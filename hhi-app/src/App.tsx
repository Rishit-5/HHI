import React from "react";
import MapComponent from "./components/MapComponent/MapComponent";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = L.icon({
  iconUrl: "marker.svg",
  iconSize: [32, 32],
});

const App: React.FC = () => {
  const stadiaAPIKey = import.meta.env.VITE_STADIA_KEY;

  return (
    <div className="relative h-full">
      <div className="absolute top-0 left-0 right-0 z-[1000] flex justify-end p-5 header-drop">
        <img
          src="att-logo.png"
          alt="Harvard Logo"
          className="h-20 filter drop-shadow invert"
        />
      </div>

      <MapComponent apiKey={stadiaAPIKey} customIcon={customIcon} />
    </div>
  );
};

export default App;
