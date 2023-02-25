import React from "react";
import {Draggable} from "react-beautiful-dnd";
const Card = (props:any) => {
    return(
        <Draggable key={props.id} draggableId={props.id} index={props.index}>
            {(provided, snapshot) => {
                return (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                            userSelect: 'none',
                            padding: 16,
                            margin: '0 0 8px 0',
                            minHeight: '50px',
                            background: snapshot.isDragging ? '#263B4a' : '#456C86',
                            color: 'white',
                            ...provided.draggableProps.style

                        }}
                    >
                        <div style={{fontSize:'1.3rem'}}>
                            {props.content}
                        </div>
                        {props.desc}
                    </div>
                )
            }}
        </Draggable>
    )
}
export default Card