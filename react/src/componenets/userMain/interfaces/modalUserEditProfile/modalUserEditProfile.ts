import React, {SetStateAction} from "react";

export interface ModalUserEditProfileProps{
    firstName:string
    lastName:string
    email:string
    phoneNumber:number
    password:string
    modalEdit:boolean
    setModalEdit: React.Dispatch<SetStateAction<boolean>>
}