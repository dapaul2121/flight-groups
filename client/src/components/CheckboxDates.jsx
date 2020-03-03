import React from 'react';
// import MemberEntry from './MemberEntry'

function CheckboxDates(props) {
    const datesFree = props.datesFree
    const datesFreeKeys = Object.keys(datesFree)
    const dateOptions = datesFreeKeys.map((i) => {
            return (<span>
                    <input type="checkbox" name={i} onClick = {props.handleDatesChange}/>
                    <label for = {i}>{`${datesFree[i].startDate} to ${datesFree[i].endDate}`}</label>
                    </span>)})
    return (
    <div>{dateOptions}</div>
    )
}

export default CheckboxDates