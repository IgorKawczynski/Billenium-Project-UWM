import {_Data} from "@/services/utils/boardUtils/DataBoard";
import React, {SetStateAction} from "react";

interface ModalAddCardProps {
    cellId:string
    open:boolean
    setOpen:React.Dispatch<SetStateAction<boolean>>
    data:_Data["data"]
    setData:_Data["setData"]
}

export default ModalAddCardProps