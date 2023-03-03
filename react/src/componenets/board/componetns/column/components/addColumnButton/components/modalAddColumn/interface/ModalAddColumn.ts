import BoardProps from "../../../../../../../interface/Board";
import {_Data} from "../../../../../../../../../interfaces/Data";
import React from "react";
interface ModalAddColumnProps {
    open:boolean
    handleOpen:() => void
    handleClose:() => void
    data:_Data["data"]
    handleDataChange:_Data["setData"]
}

export default ModalAddColumnProps