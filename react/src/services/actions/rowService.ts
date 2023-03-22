import axios from "axios";
import {urlDomain} from "@/services/actions/boardService";

export async function addRowToBackend(boardId:string, title:string){

    try{
        const response = await axios.post(urlDomain+'/api/rows', {boardId, title})
        return response.data
    }catch(error:any){
        return error.response.data.error
    }

}

export async function getAllRowsFromBackend(boardId:string){

    try{
        const response = await axios.get(urlDomain+`/api/rows/${boardId}/all`)
        return response.data
    }catch(error:any){
        return error.response.data.error
    }

}
