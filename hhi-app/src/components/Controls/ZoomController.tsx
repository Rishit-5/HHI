import { useMap } from "react-leaflet";
import "leaflet-search";






interface ZoomControllerProps {
  zoomInTitle?: string;
  zoomOutTitle?: string;
  zoomResetTitle?: string;
  zoomLevel: number;
}

function ZoomController(props: ZoomControllerProps) {
  const { zoomInTitle, zoomResetTitle, zoomOutTitle, zoomLevel } = props;

  const map = useMap();

  return (
    <div className="leaflet-control leaflet-bar absolute right-4 bottom-5 z-[1000]">
      <a
        className="leaflet-control-zoom-in"
        title={zoomInTitle}
        role="button"
        onClick={(e) => {
          map.zoomIn();
          e.preventDefault();
        }}
      >
        +
      </a>
      <a
        className="leaflet-control-zoom-out"
        title={zoomOutTitle}
        role="button"
        onClick={(e) => {
          map.zoomOut();
          e.preventDefault();
        }}
      >
        -
      </a>
      <a
        className="leaflet-control-zoom-out"
        title={zoomResetTitle}
        role="button"
        onClick={(e) => {
          map.setZoom(zoomLevel);
          e.preventDefault();
        }} // circle arrow symbol
      >
        &#x21ba;
      </a>
    </div>
  );
}

ZoomController.defaultProps = {
  zoomInTitle: "Zoom in",
  zoomOutTitle: "Zoom out",
  zoomResetTitle: "Reset zoom",
};

export default ZoomController;
