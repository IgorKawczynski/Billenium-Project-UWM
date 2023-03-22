import {_Data} from "@/services/utils/boardUtils/DataBoard";
import React, {SetStateAction} from "react";

export interface boardHeaderProps{
    data: _Data["data"]
    setModalEdit: React.Dispatch<SetStateAction<boolean>>

    setData: _Data["setData"]
}