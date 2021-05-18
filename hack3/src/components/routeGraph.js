import React from 'react'
import Station from './station'

function RouteGraph(props) {
  const data = props.route_data

  return (
    
    <div className="route-graph-container">
      
      {
        // generate many stations
        // use <Station /> with your own customized parameters
        // coding here ...
        data.map((e)=>{
          return (<Station station_id={e.station_id} line_id={e.station_type} key={e.station_id}/>)
          }
        )
      }

    </div>
  )
}

export default RouteGraph
