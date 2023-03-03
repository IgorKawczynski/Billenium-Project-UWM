import React from "react";
import _avatar from "./interface/Avatar"


const Avatar = (props:_avatar) => {
    const initials = props.name[0].toUpperCase() + props.lastName[0].toUpperCase()
    return(
        <div style={{
            background:"rgba(21,39,172,0.75)",
            color:'white',
            minWidth:'25px',
            maxWidth:'25px',
            minHeight:'25px',
            borderRadius:'100%',
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            fontSize:"12px",
            margin:'0 0 5px 0'
        }}>
            {initials}
        </div>
    )
}

export default Avatar