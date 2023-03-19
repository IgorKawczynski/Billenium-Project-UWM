import axios from "axios";
import transformData from "../utils/transfromData/transromData";
import {v4 as uuidv4} from "uuid";
import {_Data} from "../utils/boardUtils/DataBoard";


export const urlDomain = 'http://localhost:8080'

export function loadDefaultData(){
    return {
        id: "0",
        title: "Nazwa Tablicy",
        creatorName: "Twórca",
        assignedUsers: [{id: uuidv4(), name: "twórca"}],
        columnList: {
            [uuidv4()]: {
                id: uuidv4(),
                title: "Open",
                cardsLimit: 0,
                position: 0,
                cards: [{id: uuidv4(), title: "Tak", description: "Task description", position:0}],
            },
            [uuidv4()]: {
                id: uuidv4(),
                title: "In progress",
                cardsLimit: 3,
                position: 1,
                cards: [],
            },
            [uuidv4()]: {
                id: uuidv4(),
                title: "Done",
                cardsLimit: 0,
                position: 2,
                cards: [],
            },
        },
    }
}

export async function loadBoardFromBackend(id: string): Promise<_Data["data"]> {
    const apiUrl = urlDomain+`/api/boards/${id}`;
    try {
        const response = await axios.get(apiUrl);
        if(response.data != null){
            return transformData(response.data);
        }
    } catch (error) {
        console.error(error);
        return loadDefaultData();
    }
    return loadDefaultData();
}

export async function moveColumnToBackend(movedObjectId:string, newPosition:number){
    const apiUrl = urlDomain+`/api/columns/move`;
    try {
        const response = await axios.put(apiUrl, {movedObjectId, newPosition});
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

export async function editBoardToBackend(boardId:string, newTitle:string){
    const apiUrl = urlDomain+`/api/boards`;
    let response;
    try {
        return response = await axios.put(apiUrl, {boardId, newTitle});
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error;
        }
    }
}

export async function getBoardTitleFromBackend(boardId:string){
    const apiUrl = urlDomain+`/api/boards`;
    try {
        const response = await axios.get(apiUrl, {params:{boardId:boardId}});
        return response.data
    } catch (error:any) {
        if(error.data.error){
            return error.data.error
        }
    }
}

export async function fetchData(setData:_Data['setData']) {
    const result = await loadBoardFromBackend("1001");
    if (result) {
        try {
            setData(result);
        }
        catch{
            setData(loadDefaultData())
        }
    }
}