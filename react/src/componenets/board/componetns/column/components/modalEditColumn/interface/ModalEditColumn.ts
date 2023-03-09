import BoardProps from "../../../../../interface/Board";
import {_Data} from "../../../../../../../interfaces/DataBoard";
import React from "react";
interface ModalEditColumnProps {
    id:string
    title:string
    cardsLimit:number
    position:number
    modalEdit:boolean
    modalEditClose:() => void
    data:_Data["data"]
    handleDataChange:_Data["setData"]
}

export default ModalEditColumnProps