import React, {SetStateAction} from "react";
import {_Data, assignedUser, Card} from "@/services/utils/boardUtils/DataBoard";

export interface ModalEditCardMenuProps{
    cardId:string
    cardTitle:string
    setModalDelete:React.Dispatch<SetStateAction<boolean>>
    modalDelete:boolean
    assignedUsers:assignedUser[]
    isLocked:boolean
    children:Card[]
    data:_Data["data"]
    setData:_Data['setData']
}