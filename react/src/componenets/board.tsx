import React from 'react'
import {DragDropContext} from 'react-beautiful-dnd';
import Column from './column'

interface Props {
    children: React.ReactNode;
    columns: {
        [key: string]: {
            title: string;
            items: {
                id: string;
                content: string;
                desc:string;
            }[];
        };
    };
    setColumns: React.Dispatch<React.SetStateAction<{
        [key: string]: {
            title: string;
            items: {
                id: string;
                content: string;
                desc:string;
            }[];
        };
    }>>;
}
const onDragEnd = (result: any, columns:any, setColumns:any) => {
    if(!result.destination) return
    const {source, destination} = result;
    if (source.droppableId !== destination.droppableId){
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]:{
                    ...destColumn,
                    items: destItems
                }
            }
        )
    }else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems
            }
        })
    }
}
const Board: React.FC<Props> = (props) => {


    return (
        <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
            <DragDropContext
                onDragEnd={(result) =>
                    onDragEnd(result, props.columns, props.setColumns)
                }
            >
                {Object.entries(props.columns).map(([id, column]) => {
                    return (
                        <Column
                            id={id}
                            title={column.title}
                            items={column.items} // Add the items prop
                        />
                    );
                })}
            </DragDropContext>
            {props.children}
        </div>
    );
}

export default Board