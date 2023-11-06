import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
} from "react-leaflet";

import InfoPanel from "components/InfoPanel/InfoPanel";
import Marker from "components/Marker/Marker";
import { StakeholderInfo } from "types";
import ZoomController from "ZoomController";

interface MapProps {
  apiKey: string;
}

const Map: React.FC<MapProps> = ({ apiKey }) => {
  const [selectedStakeholder, setSelectedStakeholder] =
    useState<StakeholderInfo | null>(null);

  return (
    <MapContainer
      className="w-full h-full"
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={true}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=${apiKey}`}
      />
      <Marker
        selectedStakeholder={selectedStakeholder}
        setSelectedStakeholder={setSelectedStakeholder}
      />
      <InfoPanel
        stakeholder={selectedStakeholder}
        onClose={() => setSelectedStakeholder(null)}
      />

      <ZoomController zoomLevel={12.6} />
    </MapContainer>
  );
};


export default Map;
