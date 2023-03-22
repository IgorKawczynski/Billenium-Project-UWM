import * as React from "react";
import {SetStateAction} from "react";
import {_Data} from "@/services/utils/boardUtils/DataBoard";

export interface cardColorPickerItemProps{
    id:string
    colorId:string
    color:string
    title:string
    setAnchorEl:  React.Dispatch<SetStateAction<null | HTMLElement>>

    data:_Data["data"]
    setData:_Data['setData']
}