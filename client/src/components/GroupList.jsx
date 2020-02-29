import React from 'react';
import GroupEntry from './GroupEntry'

function GroupList(props) {
    const names = props.names
    const selectedGroup = props.selectedGroup
    const changeSelectedGroup = props.changeSelectedGroup

    const groupNames = names.map((name, i) => {
        if (i === selectedGroup) {
            return (<GroupEntry name = {name} i = {i} isSelected = {true} />)
        } else {
            return (<GroupEntry name = {name} i = {i} changeSelectedGroup = {changeSelectedGroup}/>)
        }
    });
    return (
        <div>{groupNames}</div>
    )
}

export default GroupList