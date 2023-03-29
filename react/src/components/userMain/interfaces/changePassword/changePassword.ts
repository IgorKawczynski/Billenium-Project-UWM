import React, {SetStateAction} from "react";

export interface ChangePasswordProps{
    password:string;
    repeatPassword:string;
    handlePasswordChange:(event: React.ChangeEvent<HTMLInputElement>) => void;
    handleRepeatPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    passwordToChange:boolean

    setPasswordToChange:React.Dispatch<SetStateAction<boolean>>
}