import {_Data} from "@/services/utils/boardUtils/DataBoard";
import React, {SetStateAction} from "react";

export interface ModalEditCardSubtasksProps{
    cardId:string
    cardTitle:string
    subtasks:{
        id:string
        title:string
        isChecked:boolean
    }[]
    data:_Data["data"]
    setData:_Data['setData']
    window:React.Dispatch<SetStateAction<boolean>>
}