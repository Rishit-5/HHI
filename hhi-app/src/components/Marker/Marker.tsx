import L from 'leaflet';
import { useState, useEffect } from "react";
import { useMap, Popup, Marker as LeafletMarker, CircleMarker } from "react-leaflet";

import { stakeholders } from "data/stakeholders";
import { StakeholderInfo, Coordinates } from "types";

interface MarkerProps {
  selectedStakeholder: StakeholderInfo | null;
  setSelectedStakeholder: React.Dispatch<React.SetStateAction<StakeholderInfo | null>>;
}

const Marker: React.FC<MarkerProps> = ({ selectedStakeholder, setSelectedStakeholder }) => {
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
        <LeafletMarker
          key={stakeholder.organizationName}
          position={stakeholder.headquarterCoordinates}
          icon={L.icon({
            iconUrl: "marker.svg",
            iconSize: [32, 32],
          })}
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

export default Marker;