import {_Data} from "@/services/utils/boardUtils/DataBoard";
import React, {SetStateAction} from "react";
interface ModalEditCardProps {

    id: string;
    columnId:string;
    title:string;
    desc:string;
    setModalEdit: React.Dispatch<SetStateAction<boolean>>
    modalEdit:boolean
    data:_Data["data"]
    setData:_Data["setData"]
}

export default ModalEditCardProps