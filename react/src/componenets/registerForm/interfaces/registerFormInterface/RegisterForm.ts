import React, {SetStateAction} from "react";

export interface RegisterFormProps {
    modalRegister: boolean
    setModalRegister: React.Dispatch<SetStateAction<boolean>>

}