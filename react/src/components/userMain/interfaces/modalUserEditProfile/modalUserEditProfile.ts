import React, {SetStateAction} from "react";
import {activeUser} from "@/services/utils/boardUtils/DataBoard";

export interface ModalUserEditProfileProps{
    activeUser:activeUser
    modalEdit:boolean
    setModalEdit: React.Dispatch<SetStateAction<boolean>>
    setActiveUser:any
}