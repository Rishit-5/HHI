import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  CircleMarker,
  useMap,
  Popup,
} from "react-leaflet";
import InfoPanel from "../InfoPanel/InfoPanel";
import { stakeholders } from "../../data/stakeholders";
import "leaflet/dist/leaflet.css";
import { StakeholderInfo, Coordinates } from "../../types";
import ZoomController from "../../ZoomController";

interface MapComponentProps {
  apiKey: string;
  customIcon: L.Icon;
}

const MarkersComponent: React.FC<{
  selectedStakeholder: StakeholderInfo | null;
  setSelectedStakeholder: React.Dispatch<
    React.SetStateAction<StakeholderInfo | null>
  >;
}> = ({ selectedStakeholder, setSelectedStakeholder }) => {
  const map = useMap();
  const [isViewAdjusted, setIsViewAdjusted] = useState(true);

  useEffect(() => {
    const handleZoomEnd = () => {
      setIsViewAdjusted(true);
    };

    map.on("zoomend", handleZoomEnd);

    return () => {
      map.off("zoomend", handleZoomEnd);
    };
  }, [map]);

  const adjustView = (coordinates: Coordinates[]) => {
    const bounds = coordinates.map((coord) => [coord[0], coord[1]]) as [
      number,
      number
    ][];
    map.flyToBounds(bounds as any, { padding: [150, 150] });
    setIsViewAdjusted(false);
  };

  return (
    <>
      {stakeholders.map((stakeholder) => (
        <Marker
          key={stakeholder.organizationName}
          position={stakeholder.headquarterCoordinates}
          eventHandlers={{
            click: () => {
              if (selectedStakeholder === stakeholder) {
                setSelectedStakeholder(null);
              } else {
                setSelectedStakeholder(stakeholder);
                const servedLocationsCoordinates = Object.values(
                  stakeholder.locationsServed
                );
                adjustView([
                  stakeholder.headquarterCoordinates,
                  ...servedLocationsCoordinates,
                ]);
              }
            },
          }}
        />
      ))}
      {isViewAdjusted &&
        selectedStakeholder &&
        Object.entries(selectedStakeholder.locationsServed).map(
          ([name, coordinates]) => (
            <CircleMarker
              key={name}
              center={coordinates}
              radius={15}
              fillColor="blue"
              color="blue"
              weight={1}
              opacity={1}
              fillOpacity={0.6}
            >
              <Popup>{name}</Popup>
            </CircleMarker>
          )
        )}
    </>
  );
};

const MapComponent: React.FC<MapComponentProps> = ({ apiKey, customIcon }) => {
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
      <MarkersComponent
        selectedStakeholder={selectedStakeholder}
        setSelectedStakeholder={setSelectedStakeholder}
      />
      <InfoPanel
        data={selectedStakeholder ? [selectedStakeholder] : []}
        isVisible={!!selectedStakeholder}
        onClose={() => setSelectedStakeholder(null)}
      />

      <ZoomController zoomLevel={12.6} />

      <Marker position={[51.525, -0.09]} icon={customIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
