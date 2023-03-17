import axios from "axios";
import {urlDomain} from '@/services/actions/boardService'
export async function addCardToBackend(columnId:string, title:string, description:string){

    try{
        const response = await axios.post(urlDomain+'/api/cards', {columnId, title, description})
        return response.data
    }catch(error:any){
        return error.response.data.error
    }

}
export async function updateCardToBackend(cardId:string, title:string, description:string){
    try{
        const response = await axios.put(urlDomain+`/api/cards`, {cardId, title, description})
        return response.data
    }catch(error:any){
        return error.response.data.error
    }

}
export async function moveCardToAnotherColumn(cardId:string, newColumnId:string, newPosition:number){
    const apiUrl = urlDomain+`/api/cards/another-column`;
    try {
        const response = await axios.put(apiUrl, {cardId, newColumnId,newPosition});
    } catch (error) {
    }
}
export async function moveCardInColumn(cardId:string, newPosition:number){
    const apiUrl = urlDomain+`/api/cards/same-column`;
    try {
        const response = await axios.put(apiUrl, {cardId, newPosition});
    } catch (error) {
    }
}
export async function removeCardToBackend(cardId:string){
    const apiUrl = urlDomain+`/api/cards/${cardId}`;
    try {
        const response = await axios.delete(apiUrl);
    } catch (error) {
    }
}
