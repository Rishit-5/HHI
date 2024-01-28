import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import LControlSearch from 'leaflet-search'

interface SearchControlProps {
  // A reference to a LayerGroup in leaflet
  layerRef: React.MutableRefObject<any>
}

const SearchControl: React.FC<SearchControlProps> = ({ layerRef }) => {
  const map = useMap()

  useEffect(() => {
    if (layerRef.current) {
      const searchControl = new LControlSearch({
        position: 'topleft',
        layer: layerRef.current,
        initial: false,
        zoom: 12,
        marker: false,
        // collapsed: false
      })

      map.addControl(searchControl)

      return () => {
        map.removeControl(searchControl)
      }
    }
  }, [layerRef])

  return null
}

export default SearchControl
