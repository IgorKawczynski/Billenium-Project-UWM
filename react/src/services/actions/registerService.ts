import axios from "axios";
import {urlDomain} from "@/services/actions/boardService";


export async function createUserToBackend(
    email:string,
    firstName:string,
    lastName:string,
    password:string
){
    try{
        const response = await axios.post(urlDomain+'/api/users/register', {email, firstName, lastName, password})
        return response.data
    }catch(error:any) {
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error;
        }
    }
}
