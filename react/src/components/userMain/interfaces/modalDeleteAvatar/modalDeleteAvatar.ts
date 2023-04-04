import React, {SetStateAction} from "react";

export interface ModalDeleteAvatarProps{
    userId:string
    modalDeleteAvatar:boolean
    setModalDeleteAvatar:React.Dispatch<SetStateAction<boolean>>
    setActiveUser:any

}