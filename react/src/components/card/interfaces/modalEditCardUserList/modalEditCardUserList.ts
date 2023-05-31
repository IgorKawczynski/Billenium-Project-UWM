import {_Data, assignedUser} from "@/services/utils/boardUtils/DataBoard";

export interface ModalEditCardUserListProps{
    cardId:string
    cardTitle:string
    assignedUsers:assignedUser[]
    data:_Data["data"]
    setData:_Data['setData']
}