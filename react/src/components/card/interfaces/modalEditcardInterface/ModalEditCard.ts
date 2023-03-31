import {_Data} from "@/services/utils/boardUtils/DataBoard";
import React, {SetStateAction} from "react";

interface ModalEditCardProps {

    id: string;
    cellId:string;
    title:string;
    desc:string;
    assignedUsers:{
        id: string;
        firstName: string;
        lastName: string;
    }[]
    setModalEdit: React.Dispatch<SetStateAction<boolean>>
    modalEdit:boolean
    setModalDelete:React.Dispatch<SetStateAction<boolean>>
    modalDelete:boolean
    data:_Data["data"]
    setData:_Data["setData"]

}

export default ModalEditCardProps