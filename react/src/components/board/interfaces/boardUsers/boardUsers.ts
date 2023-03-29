import React, {SetStateAction} from "react";
import {_Data} from "@/services/utils/boardUtils/DataBoard";

export interface BoardUsersProps{
    setData:_Data['setData']
    data:_Data['data']
    users:boolean
    setUsers: React.Dispatch<SetStateAction<boolean>>
}