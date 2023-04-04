import React from "react";

export interface EditCardFormProps{
    text:string
    handleChangeText:(event: React.ChangeEvent<HTMLInputElement>) => void
}