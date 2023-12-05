import L, { LatLngTuple } from 'leaflet';
import { useState, useEffect } from "react";
import { useMap, Popup, Marker as LeafletMarker, CircleMarker } from "react-leaflet";

import { Stakeholder} from "types";

interface MarkerProps {
  stakeholders: Stakeholder[];
  selectedStakeholder: Stakeholder | null;
  setSelectedStakeholder: React.Dispatch<React.SetStateAction<Stakeholder | null>>;
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

  const adjustView = (stakeholder: Stakeholder) => {
    if (stakeholder.global) {
      map.setView([0, 0], 2);
    } else {
      // If the stakeholder has specific locations
      const bounds = [
        stakeholder.headquarterCoordinates,
        ...stakeholder.locationsServedCoordinates ? stakeholder.locationsServedCoordinates : [],
      ].map((coord) => [coord.lat, coord.lng] as LatLngTuple);
      map.flyToBounds(bounds, { padding: [150, 150], duration: 1, easeLinearity: 0.5 });
    }
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
                adjustView(stakeholder);
              }
            },
          }}
        />
      ))}
      {isViewAdjusted &&
        selectedStakeholder &&
        selectedStakeholder.locationsServed?.map(
          (locationName, index) => {
            if (selectedStakeholder.locationsServedCoordinates)
            {
              return (
                <CircleMarker
                key={locationName}
                center={selectedStakeholder.locationsServedCoordinates[index]}
                radius={15}
                fillColor="blue"
                color="blue"
                weight={1}
                opacity={1}
                fillOpacity={0.6}
              >
                <Popup>{locationName}</Popup>
              </CircleMarker>
              )}
          }
        )
      }
    </>
  );
};

export default Marker;