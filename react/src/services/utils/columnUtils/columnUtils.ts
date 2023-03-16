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

export const editColumn = (newTitle: string,
                           limit: number,
                           id:string,
                           checkLimit:boolean,
                           data:_Data["data"],
                           setModalEdit:React.Dispatch<SetStateAction<boolean>>,
                           setData:_Data["setData"]
                           ) => {
    updateColumnToBackend(id, newTitle, limit, checkLimit)
        .then(res => {
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
                        }
                    }
                )
            // tutaj możesz wykonywać operacje na otrzymanym id
        })
        .catch(error => {
            // console.log(error.response.fieldName);
            // obsługa błędów
        });
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
                    }})
        })
};

export function addColumn(name:string,
                   data:_Data["data"],
                   setData:_Data["setData"],
                   setColumnName:React.Dispatch<SetStateAction<string>>,
                   setOpen:React.Dispatch<SetStateAction<boolean>>
                   ) {
    addColumnToBackend(data.id, name)
        .then(res => {
            getColumnFromBackend(data.id)
                .then( res => {
                        if(res) {
                            const columns:_Data["data"]['columnList'] = res
                            setData({
                                ...data,
                                columnList: columns

                            })
                            closeModal(setOpen)
                            setColumnName("")
                        }
                    }
                )
            // tutaj możesz wykonywać operacje na otrzymanym id
        })
        .catch(error => {
            console.error(error);
            // obsługa błędów
        });
}