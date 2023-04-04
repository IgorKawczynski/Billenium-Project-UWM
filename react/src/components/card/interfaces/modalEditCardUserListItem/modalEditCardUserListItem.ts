import * as React from "react";
import {SetStateAction} from "react";
import {_Data} from "@/services/utils/boardUtils/DataBoard";

export interface ModalEditCardUserListItemProps{
    userId:string
    userName:string
    userLastName:string
    userAvatarPath:string
    userAvatarColor:string
    cardId:string
    cardTitle:string
    setAnchorEl:  React.Dispatch<SetStateAction<null | HTMLElement>>
    data:_Data["data"]
    setData:_Data['setData']
}