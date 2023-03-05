import BoardProps from "../../../../../../../../../interface/Board";
import {_Data} from "../../../../../../../../../../../interfaces/DataBoard";
import React from "react";
interface ModalAddCardProps {
    columnId:string
    open:boolean
    handleOpen:() => void
    handleClose:() => void
    data:_Data["data"]
    handleDataChange:_Data["setData"]
}

export default ModalAddCardProps