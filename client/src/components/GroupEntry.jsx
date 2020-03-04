import React from 'react';

function GroupList(props) {
    if (props.isSelected === true) {
        return (
            <div style = {{backgroundColor: 'gray'}}>{props.name}</div>
        )
    } else {
        return (<div onClick = {() => {props.changeSelectedGroup(props.i)}}>{props.name}</div>)
    }
}

export default GroupList