import {_Data} from "@/services/utils/boardUtils/DataBoard";

export interface ModalEditCardSubtasksItemProps{
    id:string
    title:string
    isChecked:boolean
    cardId:string
    data:_Data['data']
    setData:_Data["setData"]
}