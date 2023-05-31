import {_Data} from "@/services/utils/boardUtils/DataBoard";

export interface DeleteUserMenuItemProps{
    userId:string
    userName:string
    userLastName:string
    userAvatarPath:string
    userAvatarColor:string
    data:_Data["data"]
    setData:_Data['setData']
}