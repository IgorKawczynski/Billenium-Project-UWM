import {_Data, Card} from "@/services/utils/boardUtils/DataBoard";
import React, {SetStateAction} from "react";

export interface ColumnCellProps{
    id:string
    rowId:string
    rowTitle:string
    columnPosition:number
    cards:Card[];
    cardsLimit:number
    position:number
    data:_Data["data"]
    setData:_Data["setData"]
    isDragging: boolean
}