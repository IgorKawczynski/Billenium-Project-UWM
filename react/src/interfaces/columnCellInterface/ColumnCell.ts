import {_Data, Card} from "@/services/utils/boardUtils/DataBoard";

export interface ColumnCellProps{
    id:string
    cards:Card[];
    cardsLimit:number
    position:number
    data:_Data["data"]
    setData:_Data["setData"]
    isDragging: boolean
}