import {_Data} from "@/services/utils/boardUtils/DataBoard";
import React, {SetStateAction} from "react";

interface ModalEditBoardProps {
    id:string
    title:string
    modalEdit:boolean
    setModalEdit:React.Dispatch<SetStateAction<boolean>>
    data:_Data["data"]
    setData:_Data["setData"]
}

export default ModalEditBoardProps