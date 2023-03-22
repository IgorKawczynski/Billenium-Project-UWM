import {_Data} from "@/services/utils/boardUtils/DataBoard";
import React, {SetStateAction} from "react";

interface ModalRemoveCardProps {

    id: string
    title:string
    cellId:string
    setModalDelete: React.Dispatch<SetStateAction<boolean>>
    modalDelete:boolean
    data:_Data["data"]
    setData:_Data["setData"]
}

export default ModalRemoveCardProps