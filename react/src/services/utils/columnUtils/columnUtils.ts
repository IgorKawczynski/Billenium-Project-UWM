import {
    addColumnToBackend,
    getColumnsFromBackend,
    removeColumnToBackend,
    updateColumnToBackend
} from "@/services/actions/columnService";
import {closeModal} from "@/services/utils/modalUtils/modalUtils";
import {_Data} from "@/services/utils/boardUtils/DataBoard";
import React, {SetStateAction} from "react";
import {handleClickVariant} from "@/services/utils/toastUtils/toastUtils";
import {enqueueSnackbar} from "notistack";

export const editColumn = (newTitle: string,
                           limit: number,
                           id:string,
                           checkLimit:boolean,
                           data:_Data["data"],
                           setModalEdit:React.Dispatch<SetStateAction<boolean>>,
                           setData:_Data["setData"],
) => {
    updateColumnToBackend(id, newTitle, limit, checkLimit)
        .then(res => {
            if(typeof res === 'string') {
                handleClickVariant(enqueueSnackbar)(res ,'error')
            }else{
            getColumnsFromBackend(data.id)
                .then( resCol => {
                        if(resCol) {
                            setData({
                                ...data,
                                columnList:resCol

                            })
                            closeModal(setModalEdit)
                            handleClickVariant(enqueueSnackbar)(`Column ${newTitle} edited` ,'success')
                        }
                    }
                )
            // tutaj możesz wykonywać operacje na otrzymanym id
        }})
    closeModal(setModalEdit)
}

export const removeColumn = (
    id:string,
    title:string,
    data:_Data["data"],
    setData:_Data["setData"]
) => {
    removeColumnToBackend(id)
        .then(res => {
            getColumnsFromBackend(data.id)
                .then( res => {
                    if(res) {
                        const columns:_Data["data"]['columnList'] = res
                        setData({
                            ...data,
                            columnList: columns

                        })
                        handleClickVariant(enqueueSnackbar)(`Column ${title} removed` ,'success')
                    }})
        })
};

export function addColumn(name:string,
                   data:_Data["data"],
                   setData:_Data["setData"],
                   setColumnName:React.Dispatch<SetStateAction<string>>,
                   setOpen:React.Dispatch<SetStateAction<boolean>>,
                    ) {
    addColumnToBackend(data.id, name)
        .then(res => {
            if(typeof res === 'string') {
                handleClickVariant(enqueueSnackbar)(res ,'error')
            }else{
            getColumnsFromBackend(data.id)
                .then( res => {
                        if(res) {
                            const columns:_Data["data"]['columnList'] = res
                            setData({
                                ...data,
                                columnList: columns

                            })
                            closeModal(setOpen)
                            handleClickVariant(enqueueSnackbar)(`Column ${name} added` ,'success')
                            setColumnName("")
                        }
                    }
                )
            // tutaj możesz wykonywać operacje na otrzymanym id
        }})
        .catch(res => {
            handleClickVariant(enqueueSnackbar)('Column title is required', 'error')
            // obsługa błędów
        });
}