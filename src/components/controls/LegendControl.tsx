import React from 'react';

interface LegendControlProps {
    selectedStakeholder: boolean;
}

const LegendControl: React.FC<LegendControlProps> = ({ selectedStakeholder }) => {
    return (
        <>
            {selectedStakeholder && (
                <div className="Legend-div" style={{ position: 'absolute', bottom: '10px', right: '10px', zIndex: 1000, backgroundColor: 'rgba(0,0,0,0.5)', padding: '10px', margin: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                        <img src={"public/selected-marker.svg"} alt="Marker 1" style={{ width: '30px', height: '30px', marginRight: '5px'}} />
                        <span className="text-white">Headquarters</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '0px' }}>
                        <svg width="30px" height="30px" style={{ marginRight: '5px' }}>
                            {/* Your SVG content for the first legend item */}
                            <circle cx="15" cy="15" r="12" fill="black" />
                        </svg>
                        <span className="text-white">Areas Served</span>
                    </div>
                </div>
            )}
        </>
    );
};

export default LegendControl;
