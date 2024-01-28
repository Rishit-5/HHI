import React, { useState, useEffect, useRef } from 'react'
import { LayerGroup, MapContainer, TileLayer, Marker as LeafletMarker, useMap } from 'react-leaflet'
import InfoPanel from 'components/InfoPanel/InfoPanel'
import Marker from 'components/Marker/Marker'
import { Stakeholder } from 'types'
import ZoomController from 'components/Controls/ZoomController'
declare const L: any
import SearchControl from 'components/SearchControl/SearchControl'
// import 'leaflet-search';

interface MapProps {
  apiKey: string
  stakeholders: Stakeholder[]
}

const Map: React.FC<MapProps> = ({ apiKey, stakeholders }) => {
  const [selectedStakeholder, setSelectedStakeholder] = useState<Stakeholder | null>(null)
  const markersLayer = useRef(null)

  return (
    <MapContainer className="h-full w-full" center={[20, 0]} zoom={3} scrollWheelZoom={true} zoomControl={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=${apiKey}`}
      />
      <LayerGroup ref={markersLayer}>
        {stakeholders.map((stakeholder) => (
          <LeafletMarker
            key={stakeholder.name}
            title={stakeholder.name}
            position={stakeholder.headquarterCoordinates}
            icon={L.icon({
              iconUrl: 'marker.svg',
              iconSize: [32, 32],
            })}
            eventHandlers={{
              click: () => {
                if (selectedStakeholder === stakeholder) {
                  setSelectedStakeholder(null)
                } else {
                  setSelectedStakeholder(stakeholder)
                }
              },
            }}
          />
        ))}
      </LayerGroup>
      <SearchControl layerRef={markersLayer} />
    </MapContainer>
  )
}

export default Map
