import { ControlOptions, Layer } from "leaflet";
import { useState, useEffect } from "react";
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch'
import { useMap } from "react-leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-search";
declare const L: any;


interface SBProps {
    mLayer: Layer;
  }

// Function that creates and returns our routing machine instance:
const createSearchBar = (controlOptions: ControlOptions, props: SBProps) => {
    const map = useMap();
    
    var markersLayer = new L.LayerGroup();	//layer contain searched elements
    map.addLayer(markersLayer);

    const instance = L.Control.Search({
        position:'topright',		
        layer: markersLayer,
        initial: false,
        zoom: 12,
        marker: false
    });

  
    return instance;
  };

  
// Pass our createRoutingMachineLayer to the createControlHook:
// const SearchBar = createControlComponent(createSearchBar);
const SearchBar = (props: SBProps) => {
    return createControlComponent(controlOptions => createSearchBar(controlOptions, props));
}
// Export
export default SearchBar;

