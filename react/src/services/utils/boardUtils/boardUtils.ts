import {_Data} from "@/services/utils/boardUtils/DataBoard";
import DataFromBackend from "@/services/utils/boardUtils/DataFromBackend";
import {getColumnById, getColumnFromBackend} from "@/services/actions/columnService";
import {moveCardInColumn, moveCardToAnotherColumn} from "@/services/actions/cardService";
import {editBoardToBackend, loadBoardFromBackend, moveColumnToBackend} from "@/services/actions/boardService";
import React, {SetStateAction} from "react";
import {closeModal} from "@/services/utils/modalUtils/modalUtils";

function withPositionInRange(lowerBound: number, upperBound: number, columns:_Data["data"]['columnList']){
    const x = Object.values(columns).filter((column) => {
        return column.position >= lowerBound && column.position <= upperBound;
    });
    return x;
}

function changePositionToRight(columns:DataFromBackend['columnList']){
    return Object.values(columns).map((column) => {
        column.position = column.position + 1
    });
}
function changePositionToLeft(columns:DataFromBackend['columnList']){
    return Object.values(columns).map((column) => {
        column.position = column.position - 1
    });
}

export const onDragEnd = (result: any, columns:_Data["data"]['columnList'], setData:_Data["setData"], data:_Data["data"]) => {
    if (!result.destination) return
    const {source, destination} = result;
    if(result.type === 'column') {
        if(destination.index < columns[result.draggableId].position){
            const columnsToChange = withPositionInRange(destination.index, source.index, columns);
            console.log(columnsToChange)
            const changedColumns = changePositionToRight(columnsToChange)
        }if(destination.index > columns[result.draggableId].position){
            const columnsToChange = withPositionInRange(source.index, destination.index, columns);
            const changedColumns = changePositionToLeft(columnsToChange)
        }
        columns[result.draggableId].position = destination.index
        moveColumnToBackend(result.draggableId, destination.index)
            .then(res => {
                getColumnFromBackend(data.id)
                    .then(res => {
                        if (res) {
                            const columns: _Data["data"]['columnList'] = res
                            setData({
                                ...data,
                                columnList: columns

                            })
                        }
                    })
            })
    }
    if(result.type === 'task') {
        if (source.droppableId !== destination.droppableId){
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.cards];
            const destItems = [...destColumn.cards];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setData({
                ...data,
                columnList: {
                    ...columns,
                    [source.droppableId]: {
                        ...sourceColumn,
                        cards: sourceItems
                    },
                    [destination.droppableId]:{
                        ...destColumn,
                        cards: destItems
                    }
                }
            })
            moveCardToAnotherColumn(result.draggableId, destination.droppableId, destination.index)
                .then(res => {
                    getColumnFromBackend(data.id)
                        .then(res => {
                            if (res) {
                                setData({
                                    ...data,
                                    columnList: {
                                        ...res,
                                        [source.droppableId]: {
                                            ...res[source.droppableId],
                                            cards: res[source.droppableId].cards
                                        },
                                        [destination.droppableId]:{
                                            ...res[destination.droppableId],
                                            cards: res[destination.droppableId].cards
                                        }
                                    }

                                })
                            }
                        })
                })
        }else{
            const column = columns[source.droppableId];
            const copiedItems = [...column.cards];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setData({
                ...data,
                columnList: {
                    ...columns,
                    [source.droppableId]: {
                        ...column,
                        cards: copiedItems
                    }
                }})

            moveCardInColumn(result.draggableId, destination.index)
                .then(res => {
                    getColumnById(result.draggableId)
                        .then(res => {
                            if (res) {
                                setData({
                                    ...data,
                                    columnList: {
                                        ...columns,
                                        [res.id]: {
                                            ...column,
                                            cards: copiedItems
                                        }
                                    }})
                            }
                        })
                })
        }
    }
}

export const editBoard = (id:string,
                          newTitle:string,
                          data:_Data['data'],
                          setData:_Data['setData'],
                          setModalEdit:React.Dispatch<SetStateAction<boolean>>) =>{
    editBoardToBackend(id, newTitle)
        .then(res => {
            loadBoardFromBackend(data.id)
                .then( data => {
                    if(data) {
                        setData(data)
                    }})
        })
    closeModal(setModalEdit)
};