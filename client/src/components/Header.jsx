import React from 'react';

function Header(props) {
    let headerText
    if (props.view === 'main') {
        headerText = 'Group Travel Organizer'
    } else if (props.view === 'addGroup') {
        headerText = 'Define a Travel Group'
    } else {
        headerText = 'Add A Travel Member'
    }
    return (
    <div style = {{margin: '20px 0px', fontWeight: 'bold'}}>{headerText}</div>
    )
}

export default Header