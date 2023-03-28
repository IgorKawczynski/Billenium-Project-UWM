import {_Data, Column} from "@/services/utils/boardUtils/DataBoard";
import DataFromBackend from "@/services/utils/boardUtils/DataFromBackend";
import {getColumnById, getColumnsFromBackend} from "@/services/actions/columnService";
import {moveCardInCell, moveCardToAnotherCell} from "@/services/actions/cardService";
import {assignUserToCard} from "@/services/utils/cardUtils/cardUtils";
import {
    assignUserToBoardToBackend,
    editBoardToBackend,
    loadBoardFromBackend,
    moveColumnToBackend
} from "@/services/actions/boardService";
import React, {SetStateAction} from "react";
import {closeModal} from "@/services/utils/modalUtils/modalUtils";
import {handleClickVariant} from "@/services/utils/toastUtils/toastUtils";
import {enqueueSnackbar} from "notistack";
import {findCellById, findCellByIndex} from "@/services/utils/cellUtils/cellUtils";

function withPositionInRange(lowerBound: number, upperBound: number, columns:_Data["data"]['columnList']){
    const newColumns = Object.values(columns).filter((column) => {
        return column.position >= lowerBound && column.position <= upperBound;
    });
    return newColumns;
}

function changePositionToRight(columns:_Data["data"]['columnList']){
    return Object.values(columns).map((column) => {
        column.position = column.position + 1
    });
}
function changePositionToLeft(columns:_Data["data"]['columnList']){
    return Object.values(columns).map((column) => {
        column.position = column.position - 1
    });
}

export const onDragEnd = (result: any, columns:Column[], setData:_Data["setData"], data:_Data["data"]) => {
    if (!result.destination) return

    console.log(result)
    const {source, destination} = result;
    if (result.type === 'column') {
        if (columns != null) {
            const movedColumn = columns.find(column => column.id === result.draggableId)
            if (movedColumn) {
                if (destination.index < movedColumn.position) {
                    const columnsToChange = withPositionInRange(destination.index, source.index, columns);
                    changePositionToRight(columnsToChange)
                }
                if (destination.index > movedColumn.position) {
                    const columnsToChange = withPositionInRange(source.index, destination.index, columns);
                    changePositionToLeft(columnsToChange)
                }
                movedColumn.position = destination.index
                moveColumnToBackend(result.draggableId, destination.index)
                    .then(res => {
                        getColumnsFromBackend(data.id)
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
        }
    }

    if (result.type === 'task') {
        if (source.droppableId !== destination.droppableId) {
            const sourceCellCordsId = findCellById(source.droppableId, data)
            const destinationCellCordsId = findCellById(destination.droppableId, data)

            const sourceColumn = columns.find(column => column.id == sourceCellCordsId.desiredColumnId)
            const destinationColumn = columns.find(column => column.id == destinationCellCordsId.desiredColumnId)
            if (!sourceColumn || !destinationColumn) {
                return;
            }
            const sourceCell = sourceColumn.cells.find(cell => cell.id == source.droppableId)
            const destinationCell = destinationColumn.cells.find(cell => cell.id == destination.droppableId)
            if (!sourceCell || !destinationCell) {
                return;
            }
            const cardToMove = sourceCell.cards.find(card => card.id == result.draggableId)
            if (!cardToMove) {
                return;
            }
            const [removed] = sourceCell.cards.splice(cardToMove.position, 1);
            destinationCell.cards.splice(destination.index, 0, removed);
            moveCardToAnotherCell(result.draggableId, destination.droppableId, destination.index)
                .then(res => {
                    getColumnsFromBackend(data.id)
                        .then(res => {
                            if (res) {
                                setData({
                                    ...data,
                                    columnList: res
                                })
                            }
                        })
                })
        } else {
            const sourceCellCordsId = findCellById(source.droppableId, data)
            const destinationCellCordsId = findCellById(destination.droppableId, data)

            const sourceColumn = columns.find(column => column.id == sourceCellCordsId.desiredColumnId)
            const destinationColumn = columns.find(column => column.id == destinationCellCordsId.desiredColumnId)
            if (!sourceColumn || !destinationColumn) {
                return;
            }
            const sourceCell = sourceColumn.cells.find(cell => cell.id == source.droppableId)
            const destinationCell = destinationColumn.cells.find(cell => cell.id == destination.droppableId)
            if (!sourceCell || !destinationCell) {
                return;
            }
            const cardToMove = sourceCell.cards.find(card => card.id == result.draggableId)
            if (!cardToMove) {
                return;
            }
            const [removed] = sourceCell.cards.splice(source.index, 1);
            sourceCell.cards.splice(destination.index, 0, removed);

            moveCardInCell(result.draggableId, destination.index)
                .then(res => {
                    getColumnsFromBackend(data.id)
                        .then(res => {
                            if (res) {
                                setData({
                                    ...data,
                                    columnList: res
                                })
                            }
                        })
                })
        }
    }
    if (result.type === 'user') {
        if (source.droppableId !== destination.droppableId) {
            const card = result.destination.droppableId.slice(0,-1)
            const user = result.draggableId.slice(0,-1)
            assignUserToCard(card,user, data, setData)
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
            if(typeof res === 'string'){
                handleClickVariant(enqueueSnackbar)(res ,'error')
            }else{
            loadBoardFromBackend(data.id)
                .then( data => {
                    if(data) {
                        setData(data)
                        handleClickVariant(enqueueSnackbar)('Success board title edited' ,'success')
                    }
                })
        }})
    closeModal(setModalEdit)
};

export function assignUserToBoard(
    boardId:string,
    userEmail:string,
    data:_Data["data"],
    setData:_Data['setData']
) {
    assignUserToBoardToBackend(boardId, userEmail)
        .then(res => {
            if(typeof res === 'string'){
                handleClickVariant(enqueueSnackbar)(res ,'error')
            }else {
                setData({
                    ...data,
                    assignedUsers:res
                })
                handleClickVariant(enqueueSnackbar)('Assign user to board' ,'success')
            }
        })
}