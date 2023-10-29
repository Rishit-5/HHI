import React from "react";
import "./InfoPanel.css";
import { InfoPanelProps } from "../../types";
import { useMap } from "react-leaflet";

const InfoPanel: React.FC<InfoPanelProps> = ({ data, isVisible, onClose }) => {
  const map = useMap();

  const disableZoom = () => {
    map.scrollWheelZoom.disable();
  };

  const enableZoom = () => {
    map.scrollWheelZoom.enable();
  };

  return (
    <div
      className={`sidebar ${isVisible ? "sidebar-visible" : ""}`}
      onMouseEnter={disableZoom}
      onMouseLeave={enableZoom}
    >
      {isVisible && (
        <>
          <span className="closebtn" onClick={onClose}>
            &times;
          </span>
          {data.map((stakeholder) => (
            <div key={stakeholder["emailAddress"]}>
              <div className="org_name">{stakeholder["organizationName"]}</div>
              <img
                className="org_img"
                src={stakeholder.logo}
                alt={`${stakeholder["organizationName"]} logo`}
              />
              <div className="org_desc">
                <a
                  href={stakeholder.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Website
                </a>
                <p>Email: {stakeholder["emailAddress"]}</p>{" "}
                <p>Headquarter: {stakeholder["headquarter"]}</p>
                <p>
                  Countries/Communities Served:{" "}
                  {Object.keys(stakeholder["locationsServed"]).join(", ")}
                </p>
                <p>{stakeholder["description"]}</p>
                <p>Tags: {stakeholder["tags"].join(", ")}</p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default InfoPanel;
