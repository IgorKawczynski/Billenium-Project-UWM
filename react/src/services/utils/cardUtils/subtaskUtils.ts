import {_Data} from "@/services/utils/boardUtils/DataBoard";
import React, {SetStateAction} from "react";
import {handleClickVariant} from "@/services/utils/toastUtils/toastUtils";
import {enqueueSnackbar} from "notistack";
import {getColumnsFromBackend} from "@/services/actions/columnService";
import {closeModal} from "@/services/utils/modalUtils/modalUtils";
import {addSubtaskToCardOnBackend, checkSubtaskOnBackend} from "@/services/actions/subtaskService";


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
    data:_Data["data"],
    setData:_Data["setData"],
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
                                handleClickVariant(enqueueSnackbar)(`Subtask done` ,'success')
                            }
                        }
                    )
                // tutaj możesz wykonywać operacje na otrzymanym id
            }})
        .catch(error => {
        });
};
