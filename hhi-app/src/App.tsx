import React from "react";

import Map from "components/Map/Map";

import "leaflet/dist/leaflet.css";

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

      <Map apiKey={stadiaAPIKey} />
    </div>
  );
};

export default App;
