import React from 'react';
import MemberEntry from './MemberEntry'

function MemberList(props) {
    const members = props.members
    const memberNames = members.map((memberInfo) => {
            return (<MemberEntry name = {`${memberInfo.firstName} ${memberInfo.lastName}`}/>)
    });
    return (
    <div>{memberNames}</div>
    )
}

export default MemberList 