import React from "react";
import _avatar from "@/componenets/card/interfaces/avatarInterface/Avatar"
import Box from "@mui/material/Box";

const Avatar = (props:_avatar) => {
    const initials = props.name[0].toUpperCase() + props.lastName[0].toUpperCase()
    return(
        <Box style={{
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
        </Box>
    )
}

export default Avatar