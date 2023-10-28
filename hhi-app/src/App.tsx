import 'leaflet/dist/leaflet.css';

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import ZoomController from './ZoomController.tsx';

const zoomLevel = 12.6; //default zoom level



export default function App() {
  return (

    <div className="relative h-full">
      <div className="absolute top-0 left-0 right-0 z-[1000] flex justify-end p-5 header-drop">
        <img src="att-logo.png" alt="Harvard Logo" className="h-20 filter drop-shadow invert"/>
      </div>

  <MapContainer className="w-full h-full" center={[51.505, -0.09]} zoom={zoomLevel} scrollWheelZoom={true} zoomControl={false}>

    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url={`https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=${process.env.STADIA_KEY}`}
    />

    <div className="absolute left-4 bottom-5 z-[1000]">
      <ZoomController zoomLevel={zoomLevel} />
    </div>

    <Marker position={[51.505, -0.09]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>

  </MapContainer>
  </div>


  );
}
