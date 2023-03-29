import React, {SetStateAction} from "react";

export interface RegisterFormProps {
    setModalLogin: React.Dispatch<SetStateAction<boolean>>
    modalRegister: boolean
    setModalRegister: React.Dispatch<SetStateAction<boolean>>

}