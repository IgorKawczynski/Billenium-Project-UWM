import {_Data} from "@/services/utils/boardUtils/DataBoard";

export interface ModalEditCardSubtasksProps{
    cardId:string
    subtasks:{
        id:string
        title:string
        isChecked:boolean
    }[]
    data:_Data["data"]
    setData:_Data['setData']
}