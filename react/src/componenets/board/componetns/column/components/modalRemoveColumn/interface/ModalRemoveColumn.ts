import BoardProps from "../../../../../interface/Board";
import {_Data} from "../../../../../../../interfaces/Data";
import React from "react";
interface ModalRemoveColumnProps {
    id:string
    title:string
    modalDelete:boolean
    modalDeleteClose:() => void
    data:_Data["data"]
    handleDataChange:_Data["setData"]
}

export default ModalRemoveColumnProps