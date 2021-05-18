import React from 'react'
import Station from './station'

function RouteGraph(props) {
  const data = props.route_data

  return (
    <div className="route-graph-container">
      <Station/>
      {
        // generate many stations
        // use <Station /> with your own customized parameters
        // coding here ...
        // data.keys((key)=>{
        //   return <Station station_id={key}/>
        // })
        // data.keys((line)=>{
        //   line.map((station)=>{
        //     return <Station station_id={station} line_id={line} />
        //   })
        // })
        data.map((e)=>{
          return <Station station_id={e.station_id} line_id={e.station_type} key={e.station_id}/>
        })
      }

    </div>
  )
}

export default RouteGraph
