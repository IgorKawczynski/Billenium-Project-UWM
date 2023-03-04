import axios from "axios";
import {transformColumns} from "./transromData";

export async function addColumnToBackend(boardId:string, title:string){
    try{
        const response = await axios.post('http://localhost:8080/api/columns', {boardId, title})
        console.log(response.data)
        return response.data
    }catch(error){
        console.error(error)
        return ""
    }

}

export async function removeColumnToBackend(id:string){
    const columnId = parseInt(id)
    try{
        await axios.delete(`http://localhost:8080/api/columns/${columnId}`)
    }catch(error){
        console.error(error)
    }
}

export async function getColumnFromBackend(boardId:string){
    try{
        const response = await axios.get(`http://localhost:8080/api/columns/${boardId}/all`)
        return transformColumns(response.data)
    }catch(error){
        console.error(error)
    }
}

