import {DraggableProvided} from "react-beautiful-dnd";
import React, {SetStateAction} from "react";
import {_Data} from "@/services/utils/boardUtils/DataBoard";

export interface columnHeaderProps{
    title:string
    cardsLimit:number
    position:number
    data:_Data["data"]

    provided: DraggableProvided
    setModalEdit:React.Dispatch<SetStateAction<boolean>>
    setModalDelete:React.Dispatch<SetStateAction<boolean>>
}