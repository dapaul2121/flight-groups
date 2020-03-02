import React from 'react';
// import MemberEntry from './MemberEntry'

function CheckboxList(props) {
    const allItems = props.allItems
    const itemOptions = allItems.map((airport) => {
            return (<div>
                    <input type="checkbox" name={airport} onClick = {props.handleCheckboxChange}/>
                    <label for = {airport}>{airport}</label>
                    </div>)})
    return (
    <div>{itemOptions}</div>
    )
}

export default CheckboxList