import BoardProps from "./Board";
import {_Data} from "./Data";
import React from "react";
interface ModalAddColumnProps {
    open:boolean
    handleOpen:() => void
    handleClose:() => void
    data:_Data["data"]
    handleDataChange:_Data["setData"]
}

export default ModalAddColumnProps