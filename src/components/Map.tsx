import React, { useState, useRef } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { Stakeholder } from 'types'
import SearchControl from 'components/controls/SearchControlT'
import InfoPanelControl from 'components/controls/InfoPanelControlT'
import ZoomControl from 'components/controls/ZoomControlT'
import StakeholderLayer from './layers/StakeholderLayer'

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
      <StakeholderLayer stakeholders={stakeholders} selectedStakeholder={selectedStakeholder} setSelectedStakeholder={setSelectedStakeholder} ref={markersLayer} />

      <InfoPanelControl stakeholder={selectedStakeholder} onClose={() => setSelectedStakeholder(null)} />
      <SearchControl layerRef={markersLayer} />
      <ZoomControl zoomLevel={3} />
    </MapContainer>
  )
}

export default Map
