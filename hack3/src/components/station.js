import React from 'react'

function Station(props) {
  const station_id = 's-' + props.station_id;
  const line_id = 'l-' + props.line_id;
  const station_name = props.station_name
  let color = props.line_id;
  if (color === 'G'){
    color = 'green'
  } else if (color === 'R'){
    color = 'red'
  } else if (color === 'B'){
    color = 'blue'
  } else if (color === 'O'){
    color = 'orange'
  }

  return (
    <div className="station-line-container">
      <div className="station-and-name" id={station_id} > {/* you should add both id and onClick to attributes */}
        <div className="station-rectangle" style={{backgroundColor:color}} >{station_name}</div>
        <div className="station-name"></div>
      </div>
      <div id={line_id} className="line"></div> {/* you should add both id to attributes */}
    </div>
  )
}

export default Station

