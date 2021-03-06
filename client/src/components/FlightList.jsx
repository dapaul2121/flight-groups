import React from 'react';
import FlightEntry from './FlightEntry'

function FlightList(props) {
    const flights = props.flights.map((flightInfo) => {
        let {origin, destination, startDate, endDate, price, url} = flightInfo
        return (<FlightEntry origin = {origin} destination = {destination} startDate = {startDate}
                 endDate = {endDate} price = {price} url = {url}/>)
        })
    return (
        <div style = {{margin: '30px 0px'}}>
          <div>Potential Flights</div>
          {flights}
        </div>
    )
}

export default FlightList
