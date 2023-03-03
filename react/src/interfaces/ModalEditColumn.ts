import BoardProps from "./Board";
import {_Data} from "./Data";
import React from "react";
interface ModalEditColumnProps {
    id:string
    title:string
    cardsLimit:number
    modalEdit:boolean
    modalEditClose:() => void
    data:_Data["data"]
    handleDataChange:_Data["setData"]
}

export default ModalEditColumnProps