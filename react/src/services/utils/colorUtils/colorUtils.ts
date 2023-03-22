import {_Data} from "@/services/utils/boardUtils/DataBoard";
import {changeCardColorToBackend, changeColorTitle, getColors} from "@/services/actions/colorService";
import {handleClickVariant} from "@/services/utils/toastUtils/toastUtils";
import {enqueueSnackbar} from "notistack";
import {getColumnsFromBackend} from "@/services/actions/columnService";
import {closeModal} from "@/services/utils/modalUtils/modalUtils";
import React, {SetStateAction} from "react";

export const updateColor = (
    id:string,
    newTitle:string,
    setData:_Data['setData'],
    data:_Data['data'],
    setEdit:React.Dispatch<SetStateAction<boolean>>
) => {
    changeColorTitle(id, newTitle)
        .then(res => {
            getColors(data.id)
                .then( res => {
                        if(res) {
                            setData({
                                ...data,
                                colorList:res
                            })
                            handleClickVariant(enqueueSnackbar)('Success color title changed' ,'success')
                            closeModal(setEdit)
                        }
                    }
                )
        })
};

export const changeCardColor = (cardId:string, newColor:string, setData:_Data['setData'], data:_Data['data']) => {
    changeCardColorToBackend(cardId, newColor)
        .then(res => {
            getColumnsFromBackend(data.id)
                .then(resCol => {
                    setData({
                        ...data,
                        columnList:resCol
                    })
                })
        })
};

