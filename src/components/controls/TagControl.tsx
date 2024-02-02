import L from 'leaflet'
import { useEffect, useRef, useState } from 'react'
import Control from 'react-leaflet-custom-control'
import { Stakeholder } from 'types'

interface TagControlProps {
  // A reference to a LayerGroup in leaflet
  layerRef: React.MutableRefObject<any>
  stakeholders: Stakeholder[]
}

const TagControl: React.FC<TagControlProps> = ({ layerRef, stakeholders }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [tags, setTags] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  useEffect(() => {
    setTags([...new Set(stakeholders.map((s) => s.tags).flat())])
    setSelectedTags(tags)
  }, [stakeholders])

  useEffect(() => {
    if (layerRef.current) {
      // names of all stakeholders with at least one tag in selectedTags
      const viewableStakeholderNames = stakeholders.filter((s) => s.tags.some((t) => selectedTags.includes(t))).map((s) => s.name)

      layerRef.current.eachLayer((layer: any) => {
        if (layer instanceof L.Marker && layer.options.title != undefined) {
          if (viewableStakeholderNames.includes(layer.options.title)) {
            layer.setOpacity(1)
          } else {
            layer.setOpacity(0)
          }
        }
      })
    }
  }, [selectedTags])

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleCheckboxChange = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((item) => item !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  return (
    <Control prepend position="topleft">
      <div className="relative rounded leaflet-bar font-metropolis">
        <a
          className="leaflet-control-zoom-in rounded pt-[2px]"
          title={'Tags'}
          role="button"
          onClick={(e) => {
            setDropdownVisible(!isDropdownVisible)
            e.preventDefault()
          }}
        >
          {/* ☰ */}
          &#x2630;
        </a>
        {isDropdownVisible && (
          <div
            ref={dropdownRef}
            className="box-border absolute top-0 w-40 bg-white border-2 rounded border-black- left-10 border-opacity-40 bg-opacity-90"
          >
            <div className="flex flex-row justify-between">
              <div className="m-1 font-semibold text-md">Tags</div>
              <div className="flex flex-row justify-center mx-1 align-middle">
                <label htmlFor="all" className="mx-2 mt-[5px]">
                  Select All
                </label>
                <input
                  type="checkbox"
                  name="all"
                  checked={selectedTags.length === tags.length}
                  onChange={() => {
                    setSelectedTags(selectedTags.length === tags.length ? [] : tags)
                  }}
                />
              </div>
            </div>
            <div className="h-64 overflow-y-auto">
              {tags.map((tag, idx) => (
                <>
                  <label key={tag} className="flex items-center px-1 py-1 hover:bg-black-100">
                    <input
                      type="checkbox"
                      value={tag}
                      checked={selectedTags.includes(tag)}
                      onChange={() => handleCheckboxChange(tag)}
                      className="mr-2"
                    />
                    {tag}
                  </label>
                  {/* Render separator below all except for last */}
                  {idx !== tags.length - 1 && <hr />}
                </>
              ))}
            </div>
          </div>
        )}
      </div>
    </Control>
  )
}

export default TagControl
