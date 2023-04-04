import React, {SetStateAction} from "react";

export interface ModalUserEditProfileProps{
    userId:string
    firstName:string
    lastName:string
    email:string
    avatarPath:string
    avatarColor:string
    modalEdit:boolean
    setModalEdit: React.Dispatch<SetStateAction<boolean>>
    setActiveUser:any
}