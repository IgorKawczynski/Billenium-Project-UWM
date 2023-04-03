import {_Data} from "@/services/utils/boardUtils/DataBoard";
import React, {SetStateAction} from "react";

export interface ModalEditCardSubtasksItemProps{
    id:string
    title:string
    isChecked:boolean
    cardId:string
    cardTitle:string
    data:_Data['data']
    setData:_Data["setData"]
    window: React.Dispatch<SetStateAction<boolean>>
}