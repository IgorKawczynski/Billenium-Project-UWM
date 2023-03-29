import axios from "axios";
import {urlDomain} from "@/services/actions/boardService";

export async function loginUserToBackend(
    email:string,
    password:string
){
    try{
        const response = await axios.post(urlDomain+'/api/users/login', {email, password})
        return response.data
    }catch(error:any) {
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error;
        }
    }
}