import React from 'react'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import Card from "./card";

interface Props {
    id: string;
    title: string;
    items: Array<any>;
}

const Column: React.FC<Props> = (props) => {
    return(
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <h2>{props.title}</h2>
            <div style={{margin:8}}>
                <Droppable droppableId={props.id} key={props.id}>
                    {(provided, snapshot) =>{
                        return(
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                    background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                                    padding: 4,
                                    width: 250,
                                    minHeight:500
                                }}
                            >
                                {props.items.map((item:any, index:any) => {
                                        return (
                                            <Card
                                                id={item.id}
                                                index={index}
                                                content={item.content}
                                                desc={item.desc}
                                            />
                                        )
                                    }
                                )}
                            </div>
                        )}}
                </Droppable>
            </div>
        </div>
    )
}

export default Column
