import {_Data, Color} from "@/services/utils/boardUtils/DataBoard";

export interface ColorPickerProps{
    cardId:string
    cardTitle:string
    colors:Color[]

    data:_Data['data']
    setData:_Data['setData']

}