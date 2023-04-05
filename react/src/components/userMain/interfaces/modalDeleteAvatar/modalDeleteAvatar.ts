import React, {SetStateAction} from "react";
import {activeUser} from "@/services/utils/boardUtils/DataBoard";

export interface ModalDeleteAvatarProps{
    activeUser:activeUser
    modalDeleteAvatar:boolean
    setModalDeleteAvatar:React.Dispatch<SetStateAction<boolean>>
    setActiveUser:any

}