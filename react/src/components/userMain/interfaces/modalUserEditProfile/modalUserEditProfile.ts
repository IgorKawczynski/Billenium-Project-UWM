import React, {SetStateAction} from "react";

export interface ModalUserEditProfileProps{
    firstName:string
    lastName:string
    email:string
    modalEdit:boolean
    setModalEdit: React.Dispatch<SetStateAction<boolean>>
}