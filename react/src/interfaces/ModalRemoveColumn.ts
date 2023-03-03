import BoardProps from "./Board";
import {_Data} from "./Data";
import React from "react";
interface ModalRemoveColumnProps {
    id:string
    modalDelete:boolean
    modalDeleteClose:() => void
    data:_Data["data"]
    handleDataChange:_Data["setData"]
}

export default ModalRemoveColumnProps