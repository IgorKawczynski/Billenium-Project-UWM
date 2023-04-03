import axios from "axios";
import {urlDomain} from "@/services/actions/boardService";

export async function addSubtaskToCardOnBackend(cardId:string, title:string){

    try{
        const response = await axios.post(urlDomain+'/api/checkboxes', {cardId, title})
        return response.data
    }catch(error:any){
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error;
        }
    }

}

export async function getCardSubtasksFromBackend(cardId:string){

    try{
        const response = await axios.get(urlDomain+`/api/checkboxes`, {params:{cardId:cardId}})
        return response.data
    }catch(error:any){
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error;
        }
    }

}

export async function updateCardSubtaskOnBackend(checkboxId:string, title:string){

    try{
        const response = await axios.put(urlDomain+'/api/checkboxes', {checkboxId, title})
        return response.data
    }catch(error:any){
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error;
        }
    }

}
export async function checkSubtaskOnBackend(checkboxId:string){

    try{
        const response = await axios.put(urlDomain+`/api/checkboxes/checked/${checkboxId}`)
        return response.data
    }catch(error:any){
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error;
        }
    }

}
export async function uncheckSubtaskOnBackend(checkboxId:string){

    try{
        const response = await axios.put(urlDomain+`/api/checkboxes/unchecked/${checkboxId}`)
        return response.data
    }catch(error:any){
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error;
        }
    }

}

export async function deleteSubtaskOnBackend(checkboxId:string){

    try{
        const response = await axios.delete(urlDomain+`/api/checkboxes/${checkboxId}`)
        console.log(response.data)
        return response.data
    }catch(error:any){
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error;
        }
    }

}
