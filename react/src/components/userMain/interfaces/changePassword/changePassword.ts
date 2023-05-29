import React, {SetStateAction} from "react";

export interface ChangePasswordProps{
    userId:string
    oldPassword:string
    setOldPassword:React.Dispatch<SetStateAction<string>>
    password:string;
    setPassword:React.Dispatch<SetStateAction<string>>
    repeatPassword:string;
    setRepeatPassword:React.Dispatch<SetStateAction<string>>
    handleOldPasswordChange:(event: React.ChangeEvent<HTMLInputElement>) => void;
    handlePasswordChange:(event: React.ChangeEvent<HTMLInputElement>) => void;
    handleRepeatPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    passwordToChange:boolean

    setPasswordToChange:React.Dispatch<SetStateAction<boolean>>

}