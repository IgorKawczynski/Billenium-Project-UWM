import axios from "axios";
import {urlDomain} from "@/services/actions/boardService";

export async function addRowToBackend(boardId:string, title:string){

    try{
        const response = await axios.post(urlDomain+'/api/rows', {boardId, title})
        return response.data
    }catch(error:any){
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error;
        }
    }

}

export async function getAllRowsFromBackend(boardId:string){

    try{
        const response = await axios.get(urlDomain+`/api/rows/${boardId}/all`)
        return response.data
    }catch(error:any){
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error;
        }
    }

}

export async function editRowToBackend(rowId:string, title:string){

    try{
        const response = await axios.put(urlDomain+`/api/rows`, {rowId, title})
        return response.data
    }catch(error:any){
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error;
        }
    }
}
export async function removeRowToBackend(rowId:string){

    try{
        const response = await axios.delete(urlDomain+`/api/rows/${rowId}`)
        return response.data
    }catch(error:any){
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error;
        }
    }
}
