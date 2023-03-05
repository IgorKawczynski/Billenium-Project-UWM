import axios from "axios";

export async function addCardToBackend(columnId:string, title:string, description:string){

    try{
        const response = await axios.post('http://localhost:8080/api/cards', {columnId, title, description})
        console.log(response.data)
        return response.data
    }catch(error){
        console.error(error)
        return ""
    }

}
export async function updateCardToBackend(cardId:string, title:string, description:string){
    try{
        const response = await axios.put(`http://localhost:8080/api/cards`, {cardId, title, description})
        return response.data
    }catch(error:any){
        return alert(error.response.data.fieldName)
    }

}