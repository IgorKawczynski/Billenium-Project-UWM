import {_Data} from "@/services/utils/boardUtils/DataBoard";

export interface ModalEditCardLockCardProps{
    cardId:string
    title:string
    isLocked:boolean
    data:_Data["data"]
    setData:_Data["setData"]
}