import axios from "axios";
import {urlDomain} from '@/services/actions/boardService'

export async function changeColorTitle(colorId:string, newTitle:string){

    try{
        const response = await axios.put(urlDomain+'/api/colors', {colorId, newTitle})
        return response.data
    }catch(error:any){
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error;
        }
    }

}

export async function changeCardColorToBackend(cardId:string, newColor:string){

    try{
        const response = await axios.put(urlDomain+'/api/cards/color', {cardId, newColor})
        return response.data
    }catch(error:any){
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error;
        }
    }

}

export async function getColors(boardId:string){

    try{
        const response = await axios.get(urlDomain+`/api/colors/${boardId}/all`)
        return response.data
    }catch(error:any){
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error;
        }
    }

}