import React, {SetStateAction} from "react";
import {_Data} from "@/services/utils/boardUtils/DataBoard";

export interface ModalEditCardMenuProps{
    cardId:string
    cardTitle:string
    setModalDelete:React.Dispatch<SetStateAction<boolean>>
    modalDelete:boolean
    assignedUsers:{
        id: string;
        firstName: string;
        lastName: string;
    }[]
    data:_Data["data"]
    setData:_Data['setData']
}