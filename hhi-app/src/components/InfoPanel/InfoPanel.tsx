import React from "react";
import "./InfoPanel.css";
import { InfoPanelProps } from "../../types";

const InfoPanel: React.FC<InfoPanelProps> = ({ data, isVisible, onClose }) => {
  return (
    <div className={`sidebar ${isVisible ? "sidebar-visible" : ""}`}>
      {isVisible && (
        <>
          <span className="closebtn" onClick={onClose}>
            &times;
          </span>
          {data.map((stakeholder) => (
            <div key={stakeholder["Email Address"]}>
              <div className="org_name">{stakeholder["Organization Name"]}</div>
              <img
                className="org_img"
                src={stakeholder.logo}
                alt={`${stakeholder["Organization Name"]} logo`}
              />
              <div className="org_desc">
                <a
                  href={stakeholder.Website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Website
                </a>
                <p>Email: {stakeholder["Email Address"]}</p>{" "}
                <p>Headquarter: {stakeholder["Headquarter Location"]}</p>
                <p>
                  Countries/Communities Served:{" "}
                  {Object.keys(stakeholder["Served Locations"]).join(", ")}
                </p>
                <p>{stakeholder["Descriptive Blurb"]}</p>
                <p>Tags: {stakeholder["Tags/themes"].join(", ")}</p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default InfoPanel;
