import {_Data} from "@/services/utils/boardUtils/DataBoard";
import React, {SetStateAction} from "react";

interface ModalRemoveChildProps {

    id: string
    childTitle:string
    childId:string
    setModalDelete: React.Dispatch<SetStateAction<boolean>>
    modalDelete:boolean
    setAnchorEl:  React.Dispatch<SetStateAction<null | HTMLElement>>
    data:_Data["data"]
    setData:_Data["setData"]
}

export default ModalRemoveChildProps