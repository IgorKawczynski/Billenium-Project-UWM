import {
    addColumnToBackend,
    getColumnById,
    getColumnFromBackend,
    removeColumnToBackend,
    updateColumnToBackend
} from "@/services/actions/columnService";
import {closeModal} from "@/services/utils/modalUtils/modalUtils";
import {_Data} from "@/services/utils/boardUtils/DataBoard";
import React, {SetStateAction} from "react";
import {handleClickVariant} from "@/services/utils/toastUtils/toastUtils";
import {enqueueSnackbar, EnqueueSnackbar} from "notistack";
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
            getColumnById(id)
                .then( res => {
                        if(res) {
                            setData({
                                ...data,
                                columnList: {
                                    ...data.columnList,
                                    [id]: res
                                }

                            })
                            closeModal(setModalEdit)
                            handleClickVariant(enqueueSnackbar)('Success column edited' ,'success')
                        }
                    }
                )
            // tutaj możesz wykonywać operacje na otrzymanym id
        }})
    closeModal(setModalEdit)
}

export const removeColumn = (id:string, data:_Data["data"], setData:_Data["setData"]) => {
    removeColumnToBackend(id)
        .then(res => {
            getColumnFromBackend(data.id)
                .then( res => {
                    if(res) {
                        const columns:_Data["data"]['columnList'] = res
                        setData({
                            ...data,
                            columnList: columns

                        })
                        handleClickVariant(enqueueSnackbar)('Success column removed' ,'success')
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
            if(res != 0){
            getColumnFromBackend(data.id)
                .then( res => {
                        if(res) {
                            const columns:_Data["data"]['columnList'] = res
                            setData({
                                ...data,
                                columnList: columns

                            })
                            closeModal(setOpen)
                            handleClickVariant(enqueueSnackbar)('Success column added' ,'success')
                            setColumnName("")
                        }
                    }
                )
            // tutaj możesz wykonywać operacje na otrzymanym id
        }})
        .catch(res => {
            handleClickVariant(enqueueSnackbar)('Column title is required', 'error')
            console.error(res);
            // obsługa błędów
        });
}