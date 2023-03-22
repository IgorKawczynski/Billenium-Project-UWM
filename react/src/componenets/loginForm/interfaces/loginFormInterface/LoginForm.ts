import React, {SetStateAction} from "react";

export interface LoginFormProps {
    modalLogin: boolean
    setModalLogin: React.Dispatch<SetStateAction<boolean>>
    modalRegister: boolean
    setModalRegister: React.Dispatch<SetStateAction<boolean>>

}