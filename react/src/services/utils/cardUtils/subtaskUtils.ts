import {_Data} from "@/services/utils/boardUtils/DataBoard";
import React, {SetStateAction} from "react";
import {handleClickVariant} from "@/services/utils/toastUtils/toastUtils";
import {enqueueSnackbar} from "notistack";
import {getColumnsFromBackend} from "@/services/actions/columnService";
import {closeModal, openModal} from "@/services/utils/modalUtils/modalUtils";
import {
    addSubtaskToCardOnBackend,
    checkSubtaskOnBackend,
    deleteSubtaskOnBackend,
    uncheckSubtaskOnBackend,
    updateCardSubtaskOnBackend
} from "@/services/actions/subtaskService";


export const addSubtask = (
                        cardId: string,
                        title: string,
                        data:_Data["data"],
                        setData:_Data["setData"],
                        setTitle:React.Dispatch<SetStateAction<string>>,
                        setOpen:React.Dispatch<SetStateAction<boolean>>
) => {
    addSubtaskToCardOnBackend(cardId, title)
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
                                handleClickVariant(enqueueSnackbar)(`Subtask ${title} added` ,'success')
                                closeModal(setOpen)
                                setTitle("")
                            }
                        }
                    )
                // tutaj możesz wykonywać operacje na otrzymanym id
            }})
        .catch(error => {
        });
};

export const checkSubtask = (
    checkboxId: string,
    title:string,
    data:_Data["data"],
    setData:_Data["setData"],
    window:React.Dispatch<SetStateAction<boolean>>
) => {
   checkSubtaskOnBackend(checkboxId)
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
                                handleClickVariant(enqueueSnackbar)(`Subtask ${title} done` ,'success')
                                openModal(window)
                            }
                        }
                    )
                // tutaj możesz wykonywać operacje na otrzymanym id
            }})
        .catch(error => {
        });
};
export const uncheckSubtask = (
    checkboxId: string,
    title:string,
    data:_Data["data"],
    setData:_Data["setData"],
    window:React.Dispatch<SetStateAction<boolean>>
) => {
    uncheckSubtaskOnBackend(checkboxId)
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
                                handleClickVariant(enqueueSnackbar)(`Subtask ${title} unfinished` ,'warning')
                                openModal(window)
                            }
                        }
                    )
                // tutaj możesz wykonywać operacje na otrzymanym id
            }})
        .catch(error => {
        });
};

export const updateSubtask = (
    checkboxId: string,
    title:string,
    data:_Data["data"],
    setData:_Data["setData"],
) => {
    updateCardSubtaskOnBackend(checkboxId, title)
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
                                handleClickVariant(enqueueSnackbar)(`Subtask ${title} edited` ,'success')

                            }
                        }
                    )
                // tutaj możesz wykonywać operacje na otrzymanym id
            }})
        .catch(error => {
        });
};
export const removeSubtask = (
    checkboxId: string,
    title:string,
    data:_Data["data"],
    setData:_Data["setData"],
) => {
    deleteSubtaskOnBackend(checkboxId)
        .then(res => {
                getColumnsFromBackend(data.id)
                    .then( resCol => {
                            if(resCol) {
                                setData({
                                    ...data,
                                    columnList:resCol
                                })
                                handleClickVariant(enqueueSnackbar)(`Subtask ${title} removed` ,'success')

                            }
                        }
                    )
                // tutaj możesz wykonywać operacje na otrzymanym id
            })
        .catch(error => {
        });
};

