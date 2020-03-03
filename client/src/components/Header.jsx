import React from 'react';

function Header(props) {
    let headerText
    if (props.view === 'main') {
        headerText = 'Book Travel With Friends'
    } else if (props.view === 'addGroup') {
        headerText = 'Define a Travel Group'
    } else {
        headerText = 'Add A Travel Member'
    }
    return (
    <div>{headerText}</div>
    )
}

export default Header