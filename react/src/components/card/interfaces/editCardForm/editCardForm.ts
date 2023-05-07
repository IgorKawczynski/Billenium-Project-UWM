import React, {SetStateAction} from "react";
import {_Data} from "@/services/utils/boardUtils/DataBoard";

export interface EditCardTitleProps{
    cardId:string
    text:string
    desc:string
    handleChangeText:(event: React.ChangeEvent<HTMLInputElement>) => void
    isLocked:boolean
    setModalEdit:React.Dispatch<SetStateAction<boolean>>
    data:_Data["data"]
    setData:_Data["setData"]
}
export interface EditCardDescProps {
    text: string
    handleChangeText: (event: React.ChangeEvent<HTMLInputElement>) => void
}