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
export async function moveCardToAnotherColumn(cardId:string, newColumnId:string, newPosition:number){
    const apiUrl = `http://localhost:8080/api/cards/another-column`;
    try {
        const response = await axios.put(apiUrl, {cardId, newColumnId,newPosition});
        console.log(response.data)
    } catch (error) {
        console.error(error);
    }
}
export async function moveCardInColumn(cardId:string, newPosition:number){
    const apiUrl = `http://localhost:8080/api/cards/same-column`;
    try {
        const response = await axios.put(apiUrl, {cardId, newPosition});
        console.log(response.data)
    } catch (error) {
        console.error(error);
    }
}
export async function removeCardToBackend(cardId:string){
    const apiUrl = `http://localhost:8080/api/cards/${cardId}`;
    try {
        const response = await axios.delete(apiUrl);
        console.log(response.data)
    } catch (error) {
        console.error(error);
    }
}
