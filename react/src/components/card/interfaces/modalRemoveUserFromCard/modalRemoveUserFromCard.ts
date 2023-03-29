import React, {SetStateAction} from "react";
import {_Data} from "@/services/utils/boardUtils/DataBoard";

export interface ModalRemoveUserFromCardProps{
    cardId:string
    cardTitle:string
    userId:string
    userName:string
    userLastName:string
    setModalDelete: React.Dispatch<SetStateAction<boolean>>
    setAnchorEl:  React.Dispatch<SetStateAction<null | HTMLElement>>
    modalDelete:boolean
    data:_Data["data"]
    setData:_Data["setData"]
}