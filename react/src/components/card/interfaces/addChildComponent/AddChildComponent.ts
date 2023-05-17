import {_Data} from "@/services/utils/boardUtils/DataBoard";

export interface AddChildComponentProps{
    boardId:string,
    cardId:string,
    data:_Data["data"]
    setData:_Data['setData']
}