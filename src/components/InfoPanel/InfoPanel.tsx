import React from 'react'
import { useMap } from 'react-leaflet'

import { Stakeholder } from 'types'
interface InfoPanelProps {
  stakeholder: Stakeholder | null
  onClose: () => void
}

const InfoPanel: React.FC<InfoPanelProps> = ({ stakeholder, onClose }) => {
  const map = useMap()

  const disableZoom = () => {
    map.scrollWheelZoom.disable()
  }

  const enableZoom = () => {
    map.scrollWheelZoom.enable()
  }

  const extractDriveFileId = (link: string): string | null => {
    const match = link.match(/id=([a-zA-Z0-9_-]+)/)
    return match ? match[1] : null
  }

  const driveFileId = stakeholder?.logo ? extractDriveFileId(stakeholder.logo) : null

  return (
    <div
      className={`${stakeholder ? 'w-[400px] px-6' : 'w-0'} duration-400 fixed left-0 z-[1000] box-border h-screen overflow-y-auto bg-white bg-opacity-70 py-10 shadow-md  transition-all`}
      onMouseEnter={disableZoom}
      onMouseLeave={enableZoom}
    >
      {stakeholder && (
        <>
          <span className="transition-color hover:text-blue-500 absolute right-6 top-6 cursor-pointer text-2xl text-gray-700 duration-300" onClick={onClose}>
            &times;
          </span>
          <div key={stakeholder.contact}>
            <div className="mb-3 text-center text-2xl font-semibold text-gray-700">{stakeholder.name}</div>

            {driveFileId && <img className="mx-auto mb-5 w-80 transform hover:scale-105" src={`https://drive.google.com/uc?id=${driveFileId}`} alt={`${stakeholder.name} logo`} />}

            <div className="mb-5 text-lg leading-6 text-gray-500">
              <a href={stakeholder.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 transition-color mb-2 block text-center no-underline duration-300">
                Visit Website
              </a>
            </div>
            <div className="flex flex-col gap-2 text-lg">
              <div>Email: {stakeholder.contact}</div>
              <div>Headquarter: {stakeholder.headquarter}</div>
              <div>Countries/Communities Served: {stakeholder.locationsServed?.join(', ')}</div>
              <div>{stakeholder.description}</div>
              <div>Tags: {stakeholder.tags.join(', ')}</div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default InfoPanel
