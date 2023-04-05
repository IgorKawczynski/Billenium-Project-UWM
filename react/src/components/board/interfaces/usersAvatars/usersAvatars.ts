import React, {SetStateAction} from "react";
import {_Data} from "@/services/utils/boardUtils/DataBoard";

export interface UsersAvatarsProps{
    setData:_Data['setData']
    data:_Data['data']
    setUsers: React.Dispatch<SetStateAction<boolean>>
}