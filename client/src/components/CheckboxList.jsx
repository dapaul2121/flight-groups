import React from 'react';

import ItemSelectWrapper from '../styles/ItemSelectWrapper'

function CheckboxList(props) {
    const allItems = props.allItems
    const itemOptions = allItems.map((airport) => {
        return (
        <ItemSelectWrapper>
          <div>{airport}</div>
          <input type="checkbox" name={airport} onClick = {props.handleCheckboxChange}/>
        </ItemSelectWrapper>
            )
        })
    return (<div>{itemOptions}</div>)
}

export default CheckboxList