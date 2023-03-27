import {createUserToBackend} from "@/services/actions/registerService";
import {handleClickVariant} from "@/services/utils/toastUtils/toastUtils";
import {enqueueSnackbar} from "notistack";
import {closeModal, openModal} from "@/services/utils/modalUtils/modalUtils";
import React, {SetStateAction} from "react";

export function registerUser(
    email:string,
    firstName:string,
    lastName:string,
    password:string,
    setModalLogin:React.Dispatch<SetStateAction<boolean>>,
    setModalRegister:React.Dispatch<SetStateAction<boolean>>
){
    createUserToBackend(email, firstName, lastName,password)
        .then(res => {
            if (typeof res === 'string') {
                handleClickVariant(enqueueSnackbar)(res, 'error')
            }else{
                closeModal(setModalRegister)
                openModal(setModalLogin)
                handleClickVariant(enqueueSnackbar)(`Successfully registered!` ,'success')
            }
        })
}