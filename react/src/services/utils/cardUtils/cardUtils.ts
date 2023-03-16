import {addCardToBackend, removeCardToBackend, updateCardToBackend} from "@/services/actions/cardService";
import {getColumnById} from "@/services/actions/columnService";
import {_Data} from "@/services/utils/boardUtils/DataBoard";
import React, {SetStateAction} from "react";
import {closeModal} from "@/services/utils/modalUtils/modalUtils";

export const removeCard = (id:string, columnId:string, setData:_Data['setData'], data:_Data['data']) => {
    removeCardToBackend(id)
        .then(res => {
            getColumnById(columnId)
                .then( res => {
                        if(res) {
                            setData({
                                ...data,
                                columnList: {
                                    ...data.columnList,
                                    [columnId]: res
                                }

                            })
                        }
                    }
                )
        })
};

export const addCard = (name: string,
                 desc: string,
                 columnId:string,
                 data:_Data["data"],
                 setData:_Data["setData"],
                 setName:React.Dispatch<SetStateAction<string>>,
                 setDesc:React.Dispatch<SetStateAction<string>>,
                 setOpen:React.Dispatch<SetStateAction<boolean>>
) => {
    addCardToBackend(columnId, name, desc)
        .then(res => {
            getColumnById(columnId)
                .then( res => {
                        if(res) {
                            setData({
                                ...data,
                                columnList: {
                                    ...data.columnList,
                                    [columnId]: res
                                }

                            })
                            closeModal(setOpen)
                            setName("")
                            setDesc("")
                        }
                    }
                )
            // tutaj możesz wykonywać operacje na otrzymanym id
        })
        .catch(error => {
            console.error(error);
            // obsługa błędów
        });
};

export const updateCard = (id:string,
                    title: string,
                    desc: string,
                    columnId:string,
                    setData:_Data['setData'],
                    data:_Data['data'],
                    setModalEdit:React.Dispatch<SetStateAction<boolean>>) => {
    updateCardToBackend(id, title, desc)
        .then(res => {
            getColumnById(columnId)
                .then( res => {
                        if(res) {
                            setData({
                                ...data,
                                columnList: {
                                    ...data.columnList,
                                    [columnId]: res
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
};