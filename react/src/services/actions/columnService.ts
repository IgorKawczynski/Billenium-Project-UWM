import axios from "axios";
import {urlDomain} from "@/services/actions/boardService";

export async function addColumnToBackend(boardId:string, title:string){
    try{
        const response = await axios.post(urlDomain+'/api/columns', {boardId, title})
        return response.data
    }catch(error:any) {
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error;
        }
    }
}

export async function removeColumnToBackend(id:string){
    const columnId = parseInt(id)
    try{
        const response =  await axios.delete(urlDomain+`/api/columns/${id}`)
        return response.data
    }catch(error:any){
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error;
        }
    }
}

export async function getColumnsFromBackend(boardId:string){
    try{
        const response =  await axios.get(urlDomain+`/api/columns/${boardId}/all`)
        return response.data
    }catch(error:any){
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error;
        }
    }
}

export async function updateColumnToBackend(columnId:string,title:string, cardsLimit:number, isUnlimited:boolean){
    try{
        const response = await axios.put(urlDomain+`/api/columns`, {columnId,title, cardsLimit, isUnlimited})
        return response.data
    }catch(error:any) {
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error;
        }
    }

}

export async function getColumnById(columnId:string){
    const apiUrl = urlDomain+`/api/columns/${columnId}`;
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error:any) {
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error;
        }
    }
}

