import {_Data, Card} from "@/services/utils/boardUtils/DataBoard";

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
    over:string
    handleOnMouseOver: (parentId:string) => void
    handleOnMouseLeave: () => void
}