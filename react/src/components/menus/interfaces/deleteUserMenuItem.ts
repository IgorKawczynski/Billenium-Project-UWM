import {_Data} from "@/services/utils/boardUtils/DataBoard";

export interface DeleteUserMenuItemProps{
    userId:string
    userAvatarPath:string
    userName:string
    userLastName:string
    data:_Data["data"]
    setData:_Data['setData']
}