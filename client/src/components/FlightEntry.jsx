import React from 'react';

function MemberEntry(props) {
    let flightInfoStr = ''
    for (let key in props) {
        if (key !== 'url') {
            flightInfoStr += `${key}: ${props[key]}    `
        }
    }
    return (
        <div onClick={()=> window.open(props.url, "_blank")}>{flightInfoStr}</div>
    )
}

export default MemberEntry