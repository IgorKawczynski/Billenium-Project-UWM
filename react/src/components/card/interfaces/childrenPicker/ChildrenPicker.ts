import {_Data, Card} from "@/services/utils/boardUtils/DataBoard";

export interface ChildrenPickerProps{
    cardId:string
    cardTitle:string
    children:Card[]
    data:_Data['data']
    setData:_Data['setData']

}