import {_Data} from "@/services/utils/boardUtils/DataBoard";
import * as React from "react";
import {SetStateAction} from "react";

export interface ChildrenPickerItemProps{
    cardId:string,
    childId:string,
    childTitle:string,
    setAnchorEl:  React.Dispatch<SetStateAction<null | HTMLElement>>
    data:_Data["data"]
    setData:_Data["setData"]
}