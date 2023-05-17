import {_Data, assignedUser, Card} from "@/services/utils/boardUtils/DataBoard";
import React, {SetStateAction} from "react";

interface ModalEditCardProps {
    id: string;
    cellId:string;
    title:string;
    desc:string;

    assignedUsers:assignedUser[]
    subtasks:{
        id:string
        title:string
        isChecked:boolean
    }[]
    isLocked:boolean
    children:Card[]
    setModalEdit: React.Dispatch<SetStateAction<boolean>>
    modalEdit:boolean
    setModalDelete:React.Dispatch<SetStateAction<boolean>>
    modalDelete:boolean
    data:_Data["data"]
    setData:_Data["setData"]

}

export default ModalEditCardProps