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
// export const editRow = (newTitle: string,
//                            limit: number,
//                            id:string,
//                            checkLimit:boolean,
//                            data:_Data["data"],
//                            setModalEdit:React.Dispatch<SetStateAction<boolean>>,
//                            setData:_Data["setData"],
// ) => {
//     updateColumnToBackend(id, newTitle, limit, checkLimit)
//         .then(res => {
//             if(typeof res === 'string') {
//                 handleClickVariant(enqueueSnackbar)(res ,'error')
//             }else{
//                 getColumnById(id)
//                     .then( res => {
//                             if(res) {
//                                 setData({
//                                     ...data,
//                                     rowList:[
//                                         res
//                                     ]
//
//                                 })
//                                 closeModal(setModalEdit)
//                                 handleClickVariant(enqueueSnackbar)('Success column edited' ,'success')
//                             }
//                         }
//                     )
//                 // tutaj możesz wykonywać operacje na otrzymanym id
//             }})
//     closeModal(setModalEdit)
// }
//
// export const removeRow = (id:string, data:_Data["data"], setData:_Data["setData"]) => {
//     removeColumnToBackend(id)
//         .then(res => {
//             getColumnFromBackend(data.id)
//                 .then( res => {
//                     if(res) {
//                         const rowList:_Data["data"]['rowList'] = res
//                         setData({
//                             ...data,
//                             rowList: rowList
//
//                         })
//                         handleClickVariant(enqueueSnackbar)('Success column removed' ,'success')
//                     }})
//         })
// };

export function addRow(name:string,
                          data:_Data["data"],
                          setData:_Data["setData"],
                          setRowName:React.Dispatch<SetStateAction<string>>,
                          setOpen:React.Dispatch<SetStateAction<boolean>>,
) {
    addRowToBackend(data.id, name)
        .then(res => {
            if(res != 0){
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
                                handleClickVariant(enqueueSnackbar)('Success row added' ,'success')
                                setRowName("")
                            })
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
                                    handleClickVariant(enqueueSnackbar)('Success row removed' ,'success')
                                })
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

export function removeRow(
    id:string,
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
                                        handleClickVariant(enqueueSnackbar)('Success row removed' ,'success')
                                    })
                            }
                        }
                    )
                // tutaj możesz wykonywać operacje na otrzymanym id
        })
        .catch(res => {
            handleClickVariant(enqueueSnackbar)('Column title is required', 'error')
            console.error(res);
            // obsługa błędów
        });

}