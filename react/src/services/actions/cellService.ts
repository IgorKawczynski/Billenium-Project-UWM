import axios from "axios";
import {urlDomain} from "@/services/actions/boardService";

export async function getCellFromBackendById(cellId:string){
    try{
        const response = await axios.get(urlDomain+`/api/cells/${cellId}`)
        return response.data
    }catch(error:any){
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error;
        }
    }

}