import {_Data} from "@/services/utils/boardUtils/DataBoard";
import React, {SetStateAction} from "react";

export interface boardContentProps{
    users:boolean
    setUsers: React.Dispatch<SetStateAction<boolean>>
    data: _Data["data"]
    setData:_Data["setData"]
}