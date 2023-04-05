import React, {SetStateAction} from "react";
import {_Data} from "@/services/utils/boardUtils/DataBoard";

export interface EditBoardFormProps {
    text:string
    handleTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void

    setText:React.Dispatch<SetStateAction<string>>
    data:_Data["data"]
    setData:_Data["setData"]

    setModalEdit?:React.Dispatch<SetStateAction<boolean>>
}