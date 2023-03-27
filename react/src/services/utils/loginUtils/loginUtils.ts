import {loginUserToBackend} from "@/services/actions/loginService";
import {handleClickVariant} from "@/services/utils/toastUtils/toastUtils";
import {enqueueSnackbar} from "notistack";
import {NavigateFunction} from "react-router-dom";

export function loginUser(
    email:string,
    password:string,
    navigate:NavigateFunction
){
    loginUserToBackend(email,password)
        .then(res => {
            if (typeof res === 'string') {
                handleClickVariant(enqueueSnackbar)(res, 'error')
            } else {
                sessionStorage.setItem('sessionId', res.sessionId)
                sessionStorage.setItem('userId', res.userId)
                sessionStorage.setItem('userEmail', res.email)
                sessionStorage.setItem('userName', res.firstName)
                sessionStorage.setItem('userLastName', res.lastName)
                navigate(`/userMain/${sessionStorage.getItem('userId')}`)
            }
        })
}
export function logoutUser(
){
    sessionStorage.removeItem('sessionId')
    sessionStorage.removeItem('userId')
    sessionStorage.removeItem('userEmail')
    sessionStorage.removeItem('userName')
    sessionStorage.removeItem('userLastName')

}