import React, {SetStateAction} from "react";
import {_Data} from "@/services/utils/boardUtils/DataBoard";

export interface ModalRemoveSubtaskFromCardProps{
    id:string
    title:string
    cardTitle:string
    data:_Data["data"]
    setData:_Data["setData"]
    modalDelete:boolean
    setModalDelete: React.Dispatch<SetStateAction<boolean>>
}