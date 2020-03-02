import React from 'react';
import DatePair from './DatePair'

function DateList(props) {
    const maxDates = props.maxDates
    const dateOptions = []
    for (let i = 0; i < maxDates; i++) {
        dateOptions.push(<DatePair i = {i} handleDateChange = {props.handleDateChange}/>)
    }
    return (
    <div>{dateOptions}</div>
    )
}

export default DateList