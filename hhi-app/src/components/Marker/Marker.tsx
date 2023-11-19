import L, { LatLngTuple } from 'leaflet';
import { useState, useEffect } from "react";
import { useMap, Popup, Marker as LeafletMarker, CircleMarker } from "react-leaflet";

import { StakeholderInfo, Coordinates } from "types";

interface MarkerProps {
  stakeholders: StakeholderInfo[];
  selectedStakeholder: StakeholderInfo | null;
  setSelectedStakeholder: React.Dispatch<React.SetStateAction<StakeholderInfo | null>>;
}

const Marker: React.FC<MarkerProps> = ({ stakeholders, selectedStakeholder, setSelectedStakeholder }) => {
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
    const bounds = coordinates.map((coord) => [coord.lat, coord.lng] as LatLngTuple);
    map.flyToBounds(bounds, { padding: [150, 150] });
    setIsViewAdjusted(false);
  };

  return (
    <>
      {stakeholders.map((stakeholder) => (
        <LeafletMarker
          key={stakeholder.name}
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
                adjustView([
                  stakeholder.headquarterCoordinates,
                  ...stakeholder.locationServedCoordinates,
                ]);
              }6
            },
          }}
        />
      ))}
      {isViewAdjusted &&
        selectedStakeholder &&
        selectedStakeholder.locationsServed.map(
          (locationName, index) => (
            <CircleMarker
              key={locationName}
              center={selectedStakeholder.locationServedCoordinates[index]}
              radius={15}
              fillColor="blue"
              color="blue"
              weight={1}
              opacity={1}
              fillOpacity={0.6}
            >
              <Popup>{locationName}</Popup>
            </CircleMarker>
          )
        )}
    </>
  );
};

export default Marker;