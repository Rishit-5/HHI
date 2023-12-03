import React, { useState, useEffect } from "react";
import { OpenStreetMapProvider, GeoSearchControl, SearchControl } from 'leaflet-geosearch'
import {
  MapContainer,
  TileLayer,
  useMap
} from "react-leaflet";
import InfoPanel from "components/InfoPanel/InfoPanel";
import Marker from "components/Marker/Marker";
import { StakeholderInfo } from "types";
import ZoomController from "components/Controls/ZoomController";
declare const L: any;
import LControlSearch from 'leaflet-search';
// import 'leaflet-search';


interface MapProps {
  apiKey: string;
  stakeholders: Stakeholder[];
}


const Map: React.FC<MapProps> = ({ apiKey, stakeholders }) => {
  const [selectedStakeholder, setSelectedStakeholder] =
    useState<Stakeholder | null>(null);


    function MarkerSearchBar() {
      const map = useMap(); //here use useMap hook
      var markersLayer = new L.LayerGroup();	//layer contain searched elements

      useEffect(() => {
        map.addLayer(markersLayer);

        var controlSearch = new LControlSearch({
          position:'topleft',		
          layer: markersLayer,
          initial: false,
          zoom: 12,
          marker: false
          // collapsed: false
        });
      
        map.addControl( controlSearch );

        // Loop through stakeholders and add markers to the markersLayer
        stakeholders.forEach((stakeholder) => {
          const { name, headquarterCoordinates } = stakeholder;
          const { lat, lng } = headquarterCoordinates;

          const marker = new L.Marker(new L.LatLng(lat, lng), { title: name, opacity: 0});
          markersLayer.addLayer(marker);
          
        });
        return () => {
          map.removeControl(controlSearch)
        };
      }, []);

      return null;
    }

    

    function GeoSearchBar() {
      const map = useMap(); //here use useMap hook
    
      useEffect(() => {
        const provider = new OpenStreetMapProvider();
    
        const searchControl = GeoSearchControl({
          provider
        });
    
        map.addControl(searchControl);
    
        return () => {
          map.removeControl(searchControl)
        };
      }, []);
    
      return null;
    }



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
      <MarkerSearchBar />

      <ZoomController zoomLevel={3} />
    </MapContainer>
  );
};


export default Map;
