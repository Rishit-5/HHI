import React from "react";
import { useMap } from "react-leaflet";

import { Stakeholder } from "types";
interface InfoPanelProps {
  stakeholder: Stakeholder | null;
  onClose: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ stakeholder, onClose }) => {
  const map = useMap();

  const disableZoom = () => {
    map.scrollWheelZoom.disable();
  };

  const enableZoom = () => {
    map.scrollWheelZoom.enable();
  };

  const extractDriveFileId = (link: string): string | null => {
    const match = link.match(/id=([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  const driveFileId = stakeholder?.logo ? extractDriveFileId(stakeholder.logo) : null;

  return (
    <div
      className={`${stakeholder ? "w-[400px] px-6" : "w-0"} fixed left-0 h-screen py-10 box-border overflow-y-auto bg-white shadow-md z-[1000] bg-opacity-70 transition-all  duration-400`}
      onMouseEnter={disableZoom}
      onMouseLeave={enableZoom}
    >
      {stakeholder && (
        <>
          <span className="absolute text-2xl text-gray-700 duration-300 cursor-pointer top-6 right-6 transition-color hover:text-blue-500" onClick={onClose}>
            &times;
          </span>
          <div key={stakeholder.contact}>
            <div className="mb-3 text-2xl font-semibold text-center text-gray-700">
              {stakeholder.name}
            </div>

            {driveFileId && (
              <img
                className="mx-auto mb-5 transform w-80 hover:scale-105"
                src={`https://drive.google.com/uc?id=${driveFileId}`}
                alt={`${stakeholder.name} logo`}
              />
            )}

            <div className="mb-5 text-lg leading-6 text-gray-500">
              <a
                href={stakeholder.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block mb-2 text-center text-blue-500 no-underline duration-300 hover:text-blue-700 transition-color"
              >
                Visit Website
              </a>
            </div>
            <div className="flex flex-col gap-2 text-lg">
              <div>Email: {stakeholder.contact}</div>
              <div>Headquarter: {stakeholder.headquarter}</div>
              <div>
                Countries/Communities Served:{" "}
                {stakeholder.locationsServed?.join(", ")}
              </div>
              <div>{stakeholder.description}</div>
              <div>Tags: {stakeholder.tags.join(", ")}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InfoPanel;
