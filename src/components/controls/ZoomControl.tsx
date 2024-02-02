import { useMap } from 'react-leaflet'
import Control from 'react-leaflet-custom-control'

interface ZoomControlProps {
  zoomInTitle?: string
  zoomOutTitle?: string
  zoomResetTitle?: string
  zoomLevel: number
}

function ZoomControl(props: ZoomControlProps) {
  const { zoomInTitle, zoomResetTitle, zoomOutTitle, zoomLevel } = props

  const map = useMap()

  return (
    <Control position="topleft">
      <div className="leaflet-bar">
        <a
          className="leaflet-control-zoom-in"
          title={zoomInTitle}
          role="button"
          onClick={(e) => {
            map.zoomIn()
            e.preventDefault()
          }}
        >
          +
        </a>
        <a
          className="leaflet-control-zoom-out"
          title={zoomOutTitle}
          role="button"
          onClick={(e) => {
            map.zoomOut()
            e.preventDefault()
          }}
        >
          -
        </a>
        <a
          className="leaflet-control-zoom-out"
          title={zoomResetTitle}
          role="button"
          onClick={(e) => {
            map.setZoom(zoomLevel)
            e.preventDefault()
          }} // circle arrow symbol
        >
          &#x21ba;
        </a>
      </div>
    </Control>
  )
}

ZoomControl.defaultProps = {
  zoomInTitle: 'Zoom in',
  zoomOutTitle: 'Zoom out',
  zoomResetTitle: 'Reset zoom',
}

export default ZoomControl
