import {_Data} from "@/services/utils/boardUtils/DataBoard";
import React, {SetStateAction} from "react";

interface ModalRemoveColumnProps {
    id:string
    title:string
    modalDelete:boolean
    setModalDelete:React.Dispatch<SetStateAction<boolean>>
    data:_Data["data"]
    setData:_Data["setData"]
}

export default ModalRemoveColumnProps