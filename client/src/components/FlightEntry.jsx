import React from 'react';

function MemberEntry(props) {
    return (
        <div onClick={()=> window.open(props.url, "_blank")} style = {{border: 'solid 1px gray', width: '400px', margin: '0px 50px'}}>
          <div>{`$${props.price}`}</div>
          <div>{`${props.origin} to ${props.destination}`}</div>
          <div>{`${props.startDate} to ${props.endDate}`}</div>
        </div>
    )
}

export default MemberEntry