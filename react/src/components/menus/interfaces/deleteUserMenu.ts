import {_Data, assignedUser} from "@/services/utils/boardUtils/DataBoard";
import React, {SetStateAction} from "react";

export interface DeleteUserMenuProps{
    assignedUsers:assignedUser[]
    data:_Data["data"]
    setData:_Data["setData"]
    modalDeleteUser:boolean
    setModalDeleteUser:React.Dispatch<SetStateAction<boolean>>
}