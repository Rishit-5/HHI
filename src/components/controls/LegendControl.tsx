import React from 'react'

interface LegendControlProps {
  selectedStakeholder: any
}

const LegendControl: React.FC<LegendControlProps> = ({ selectedStakeholder }) => {
  return (
    <>
      {selectedStakeholder && (
        <div className="absolute bottom-3 right-3 z-[1000] m-3 rounded-md bg-white bg-opacity-50 p-3">
          <div className="mt-1 flex items-center">
            <img src={'selected-marker.svg'} alt="Marker 1" className="mr-1 h-8 w-8" />
            <span className="font-metropolis text-black-">Headquarters</span>
          </div>

          <div className="mt-0 flex items-center">
            <svg width="30px" height="30px" className="mr-1">
              {/* Your SVG content for the first legend item */}
              <circle cx="15" cy="15" r="12" fill="black" />
            </svg>
            <span className="font-metropolis text-black-">Areas Served</span>
          </div>
        </div>
      )}
    </>
  )
}

export default LegendControl
