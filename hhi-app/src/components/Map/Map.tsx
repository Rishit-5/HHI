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
  stakeholders: StakeholderInfo[];
}

const Map: React.FC<MapProps> = ({ apiKey, stakeholders }) => {
  const [selectedStakeholder, setSelectedStakeholder] =
    useState<StakeholderInfo | null>(null);

  return (
    <MapContainer
      className="w-full h-full"
      center={[20, 0]}
      zoom={3}
      scrollWheelZoom={true}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=${apiKey}`}
      />
      <Marker
        stakeholders={stakeholders}
        selectedStakeholder={selectedStakeholder}
        setSelectedStakeholder={setSelectedStakeholder}
      />
      <InfoPanel
        stakeholder={selectedStakeholder}
        onClose={() => setSelectedStakeholder(null)}
      />

      <ZoomController zoomLevel={3} />
    </MapContainer>
  );
};


export default Map;
