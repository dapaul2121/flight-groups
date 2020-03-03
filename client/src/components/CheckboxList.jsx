import React from 'react';

import {Form} from 'react-bootstrap'
// import MemberEntry from './MemberEntry'

function CheckboxList(props) {
    const allItems = props.allItems
    const itemOptions = allItems.map((airport) => {
            return (<div>
                    <label>{airport}</label>
                    <Form.Check type="checkbox" name={airport} onClick = {props.handleCheckboxChange}/>
                    </div>)})
    return (
    <div>{itemOptions}</div>
    )
}

export default CheckboxList