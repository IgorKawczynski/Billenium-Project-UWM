import {
    addCardToBackend,
    assignUserToCardToBackend,
    removeCardToBackend,
    updateCardToBackend,
    removeUserFromCardToBackend
} from "@/services/actions/cardService";
import {getColumnsFromBackend} from "@/services/actions/columnService";
import {_Data} from "@/services/utils/boardUtils/DataBoard";
import React, {SetStateAction} from "react";
import {closeModal} from "@/services/utils/modalUtils/modalUtils";
import {handleClickVariant} from "@/services/utils/toastUtils/toastUtils";
import {enqueueSnackbar} from "notistack";

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
            console.error(error);
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
            // console.log(error.response.fieldName);
            // obsługa błędów
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
                getColumnsFromBackend(data.id)
                    .then(resCol => {
                        setData({
                            ...data,
                            columnList:resCol
                        })
                        handleClickVariant(enqueueSnackbar)(`Added user to card` ,'success')
                    })
            }
        })
}
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
                getColumnsFromBackend(data.id)
                    .then(resCol => {
                        setData({
                            ...data,
                            columnList:resCol
                        })
                        handleClickVariant(enqueueSnackbar)(`Removed user ${userFirstName} ${userLastName} from card ${cardTitle}` ,'success')
                    })
            }
        })
}