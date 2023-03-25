import React from "react";
import _avatar from "@/componenets/card/interfaces/avatarInterface/Avatar"
import Box from "@mui/material/Box";
import {Tooltip, Typography} from "@mui/material";
import {Draggable} from "react-beautiful-dnd";
import {closeModal, openModal} from "@/services/utils/modalUtils/modalUtils";

const Avatar = (props:_avatar) => {
    const initials = props.name[0].toUpperCase() + props.lastName[0].toUpperCase()
    const name = props.name + " " + props.lastName

    return(
        <Draggable
            key={'userId'}
            draggableId={'userId'}
            index={1}
        >
            {(provided, snapshot) => {
                return(
                    <Tooltip title={name} placement={'top'}>
                    <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{
                            background:"rgba(21,39,172,0.75)",
                            color:'white',
                            minWidth:'30px',
                            maxWidth:'30px',
                            minHeight:'30px',
                            borderRadius:'100%',
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center",
                            fontSize:"12px",
                            margin:'0 0 5px 0',
                            zIndex:16,
                            ...provided.draggableProps.style
                        }}
                    >
                        <Typography variant={"body1"}>
                            {initials}
                        </Typography>
                    </Box>
                    </Tooltip>
                )}
            }
        </Draggable>
    )
}

export default Avatar