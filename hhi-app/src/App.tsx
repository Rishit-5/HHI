import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import 'leaflet/dist/leaflet.css';
import ZoomController from './ZoomController.tsx';


const zoomLevel = 12.6; //default zoom level



export default function App() {
  return (


  <MapContainer className="w-full h-full" center={[51.505, -0.09]} zoom={zoomLevel} scrollWheelZoom={false} zoomControl={false}>

    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    <div style={{ padding: '10px' }}>
      <ZoomController zoomLevel={zoomLevel} />
    </div>

    <Marker position={[51.505, -0.09]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>

  </MapContainer>


  );
}
