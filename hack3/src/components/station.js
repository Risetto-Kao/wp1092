import React from 'react'

function Station(props) {

  return (
    <div className="station-line-container">
      <div className="station-and-name" id={props.station_id} onClick={props.station_click}> {/* you should add both id and onClick to attributes */}
        <div className="station-rectangle"></div>
        <div className="station-name"></div>
      </div>
      <div id={props.line_id} className="line"></div> {/* you should add both id to attributes */}
    </div>
  )
}

export default Station
