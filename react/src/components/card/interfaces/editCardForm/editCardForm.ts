import React, {SetStateAction} from "react";

export interface EditCardTitleProps{
    text:string
    handleChangeText:(event: React.ChangeEvent<HTMLInputElement>) => void
    isLocked:boolean
    setModalEdit:React.Dispatch<SetStateAction<boolean>>
}
export interface EditCardDescProps{
    text:string
    handleChangeText:(event: React.ChangeEvent<HTMLInputElement>) => void
}