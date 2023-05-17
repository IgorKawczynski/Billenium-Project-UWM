import {
    addCardToBackend, addChildToCardToBackend,
    assignUserToCardToBackend, getCardsWithoutParentsFromBackend,
    lockCardOnBackend,
    removeCardToBackend, removeChildFromCardToBackend,
    removeUserFromCardToBackend,
    unlockCardOnBackend,
    updateCardToBackend
} from "@/services/actions/cardService";
import {getColumnsFromBackend} from "@/services/actions/columnService";
import {_Data} from "@/services/utils/boardUtils/DataBoard";
import React, {SetStateAction} from "react";
import {closeModal} from "@/services/utils/modalUtils/modalUtils";
import {handleClickVariant} from "@/services/utils/toastUtils/toastUtils";
import {enqueueSnackbar} from "notistack";
import {getBoardUsersFromBackend} from "@/services/actions/boardService";

export const removeCard = (
    id:string,
    title:string,
    columnId:string,
    setData:_Data['setData'],
    data:_Data['data']
) => {
    removeCardToBackend(id)
        .then(res => {
            getColumnsFromBackend(data.id)
                .then( resCol => {
                        if(resCol) {
                            setData({
                                ...data,
                                columnList:resCol
                            })
                            handleClickVariant(enqueueSnackbar)(`Card ${title} removed` ,'success')
                        }
                    }
                )
        })
};

export const addCard = (name: string,
                 desc: string,
                 cellId:string,
                 data:_Data["data"],
                 setData:_Data["setData"],
                 setName:React.Dispatch<SetStateAction<string>>,
                 setDesc:React.Dispatch<SetStateAction<string>>,
                 setOpen:React.Dispatch<SetStateAction<boolean>>
) => {
    addCardToBackend(cellId, name, desc)
        .then(res => {
            if(typeof res === 'string'){
                handleClickVariant(enqueueSnackbar)(res ,'error')
            }else{
            getColumnsFromBackend(data.id)
                .then( resCol => {
                        if(resCol) {
                            setData({
                                ...data,
                                columnList:resCol
                            })
                            handleClickVariant(enqueueSnackbar)(`Card ${name} added` ,'success')
                            closeModal(setOpen)
                            setName("")
                            setDesc("")
                        }
                    }
                )
            // tutaj możesz wykonywać operacje na otrzymanym id
        }})
        .catch(error => {
        });
};

export const updateCard = (id:string,
                    title: string,
                    desc: string,
                    setData:_Data['setData'],
                    data:_Data['data'],
                    setModalEdit:React.Dispatch<SetStateAction<boolean>>) => {
    updateCardToBackend(id, title, desc)
        .then(res => {
            if(typeof res === 'string'){
                handleClickVariant(enqueueSnackbar)(res ,'error')
            }else{
            getColumnsFromBackend(data.id)
                .then( resCol => {
                        if(resCol) {
                            setData({
                                ...data,
                                columnList: resCol

                            })
                            closeModal(setModalEdit)
                            handleClickVariant(enqueueSnackbar)(`Card ${title} edited` ,'success')
                        }
                    }
                )
            // tutaj możesz wykonywać operacje na otrzymanym id
        }})
        .catch(error => {
        });
};

export function assignUserToCard(
    cardId:string,
    userId:string,
    data:_Data['data'],
    setData:_Data['setData']
){
    assignUserToCardToBackend(cardId, userId)
        .then(res => {
            if(typeof res === 'string'){
                handleClickVariant(enqueueSnackbar)(res ,'error')
            }else {
                getBoardUsersFromBackend(data.id)
                    .then(resUsers => {
                        getColumnsFromBackend(data.id)
                            .then(resCol => {
                                setData({
                                    ...data,
                                    columnList:resCol,
                                    assignedUsers:resUsers
                                })
                                handleClickVariant(enqueueSnackbar)(`Assigned user to card` ,'success')
                            })
                    })
            }
        })
}
export function getCardsWithoutParents(
    boardId:string,
    parentId:string,
){
    getCardsWithoutParentsFromBackend(boardId, parentId)
        .then(res => {
            return res
        }).catch( error => {
        handleClickVariant(enqueueSnackbar)(`${error}`, 'warning')
        return []
    })
    return[]
}
export const lockCard = (
    id:string,
    title:string,
    data:_Data['data'],
    setData:_Data['setData']
) => {
    lockCardOnBackend(id)
        .then(res => {
            if(typeof res === 'string'){
                handleClickVariant(enqueueSnackbar)(res ,'error')
            }else{
                getColumnsFromBackend(data.id)
                    .then( resCol => {
                            if(resCol) {
                                setData({
                                    ...data,
                                    columnList: resCol

                                })
                                handleClickVariant(enqueueSnackbar)(`Card ${title} locked` ,'info')
                            }
                        }
                    )
                // tutaj możesz wykonywać operacje na otrzymanym id
            }})
        .catch(error => {
        });
};

export const addChild = (
    parentId:string,
    childId:string,
    data:_Data['data'],
    setData:_Data['setData']
) => {
    addChildToCardToBackend(parentId,childId)
        .then(res => {
            if(typeof res === 'string'){
                handleClickVariant(enqueueSnackbar)(res ,'error')
            }else{
                getColumnsFromBackend(data.id)
                    .then( resCol => {
                            if(resCol) {
                                setData({
                                    ...data,
                                    columnList: resCol

                                })
                                handleClickVariant(enqueueSnackbar)(`Child added` ,'success')
                            }
                        }
                    )
                // tutaj możesz wykonywać operacje na otrzymanym id
            }})
        .catch(error => {
        });
};
export const removeChild = (
    parentId:string,
    childId:string,
    childTile:string,
    data:_Data['data'],
    setData:_Data['setData']
) => {
    removeChildFromCardToBackend(parentId,childId)
        .then(res => {
            if(typeof res === 'string'){
                handleClickVariant(enqueueSnackbar)(res ,'error')
            }else{
                getColumnsFromBackend(data.id)
                    .then( resCol => {
                            if(resCol) {
                                setData({
                                    ...data,
                                    columnList: resCol

                                })
                                handleClickVariant(enqueueSnackbar)(`Child ${childTile} removed` ,'warning')
                            }
                        }
                    )
                // tutaj możesz wykonywać operacje na otrzymanym id
            }})
        .catch(error => {
        });
};


export const unlockCard = (
    id:string,
    title:string,
    data:_Data['data'],
    setData:_Data['setData']
) => {
    unlockCardOnBackend(id)
        .then(res => {
            if(typeof res === 'string'){
                handleClickVariant(enqueueSnackbar)(res ,'error')
            }else{
                getColumnsFromBackend(data.id)
                    .then( resCol => {
                            if(resCol) {
                                setData({
                                    ...data,
                                    columnList: resCol

                                })
                                handleClickVariant(enqueueSnackbar)(`Card ${title} unlocked` ,'info')
                            }
                        }
                    )
                // tutaj możesz wykonywać operacje na otrzymanym id
            }})
        .catch(error => {
        });
};
export function removeUserFromCard(
    cardId:string,
    userId:string,
    userFirstName:string,
    userLastName:string,
    cardTitle:string,
    data:_Data['data'],
    setData:_Data['setData']
){
    removeUserFromCardToBackend(cardId, userId)
        .then(res => {
            if(typeof res === 'string'){
                handleClickVariant(enqueueSnackbar)(res ,'error')
            }else {
                getBoardUsersFromBackend(data.id)
                    .then(resUsers => {
                        getColumnsFromBackend(data.id)
                            .then(resCol => {
                                setData({
                                    ...data,
                                    columnList:resCol,
                                    assignedUsers:resUsers
                                })
                                handleClickVariant(enqueueSnackbar)(`Removed user ${userFirstName} ${userLastName} from card ${cardTitle}` ,'success')
                            })
                    })
            }
        })
}