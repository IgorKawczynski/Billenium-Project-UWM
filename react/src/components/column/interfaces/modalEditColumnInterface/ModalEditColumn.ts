import {_Data} from "@/services/utils/boardUtils/DataBoard";
import React, {SetStateAction} from "react";

interface ModalEditColumnProps {
    id:string
    title:string
    cardsLimit:number
    position:number
    modalEdit:boolean
    setModalEdit:React.Dispatch<SetStateAction<boolean>>
    data:_Data["data"]
    setData:_Data["setData"]
}

export default ModalEditColumnProps