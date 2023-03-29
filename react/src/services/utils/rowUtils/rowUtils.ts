import {closeModal} from "@/services/utils/modalUtils/modalUtils";
import {_Data} from "@/services/utils/boardUtils/DataBoard";
import React, {SetStateAction} from "react";
import {handleClickVariant} from "@/services/utils/toastUtils/toastUtils";
import {enqueueSnackbar} from "notistack";
import {
    addRowToBackend,
    editRowToBackend,
    getAllRowsFromBackend,
    removeRowToBackend
} from "@/services/actions/rowService";
import {getColumnsFromBackend} from "@/services/actions/columnService";

export function addRow(name:string,
                          data:_Data["data"],
                          setData:_Data["setData"],
                          setRowName:React.Dispatch<SetStateAction<string>>,
                          setOpen:React.Dispatch<SetStateAction<boolean>>,
) {
    addRowToBackend(data.id, name)
        .then(res => {
            if(typeof res === 'string') {
                handleClickVariant(enqueueSnackbar)(res ,'error')
            }else{
                getAllRowsFromBackend(data.id)
                    .then( resRow => {
                            if(resRow) {
                                getColumnsFromBackend(data.id)
                                    .then( resCol => {
                                setData({
                                    ...data,
                                    rowList: resRow,
                                    columnList:resCol

                                })
                                closeModal(setOpen)
                                handleClickVariant(enqueueSnackbar)(`Row ${name} added` ,'success')
                                setRowName("")
                            })
                        }
                    }
                    )
                // tutaj możesz wykonywać operacje na otrzymanym id
            }})
        .catch(res => {
            handleClickVariant(enqueueSnackbar)('Row title is required', 'error')
            // obsługa błędów
        });
}

export function editRow(
    id:string,
    title:string,
    data:_Data["data"],
    setData:_Data["setData"],
    setModalEdit:React.Dispatch<SetStateAction<boolean>>
){
    editRowToBackend(id, title)
        .then(res => {
            if(typeof res === 'string') {
                handleClickVariant(enqueueSnackbar)(res ,'error')
            }else{
            getAllRowsFromBackend(data.id)
                .then( resRow => {
                        if(resRow) {
                            getColumnsFromBackend(data.id)
                                .then( resCol => {
                                    setData({
                                        ...data,
                                        rowList: resRow,
                                        columnList:resCol

                                    })
                                    closeModal(setModalEdit)
                                    handleClickVariant(enqueueSnackbar)(`Row ${title} edited` ,'success')
                                })
                        }
                    }
                )
            // tutaj możesz wykonywać operacje na otrzymanym id
        }})
        .catch(res => {
            handleClickVariant(enqueueSnackbar)('Row title is required', 'error')
            // obsługa błędów
        });
}

export function removeRow(
    id:string,
    title:string,
    data:_Data["data"],
    setData:_Data["setData"],
    setModalRemove:React.Dispatch<SetStateAction<boolean>>
){
    removeRowToBackend(id)
        .then(res => {
                getAllRowsFromBackend(data.id)
                    .then( resRow => {
                            if(resRow) {
                                getColumnsFromBackend(data.id)
                                    .then( resCol => {
                                        setData({
                                            ...data,
                                            rowList: resRow,
                                            columnList:resCol

                                        })
                                        closeModal(setModalRemove)
                                        handleClickVariant(enqueueSnackbar)(`Row ${title} removed` ,'success')
                                    })
                            }
                        }
                    )
                // tutaj możesz wykonywać operacje na otrzymanym id
        })

}