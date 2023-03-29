import {_Data} from "@/services/utils/boardUtils/DataBoard";

export interface ModalEditCardUserListProps{
    cardId:string
    cardTitle:string
    assignedUsers:{
        id: string;
        firstName: string;
        lastName: string;
    }[]
    data:_Data["data"]
    setData:_Data['setData']
}