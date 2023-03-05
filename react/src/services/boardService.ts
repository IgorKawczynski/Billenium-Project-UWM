import axios from "axios";
import transformData from "./transromData";
import {v4 as uuidv4} from "uuid";
import {_Data} from "../interfaces/DataBoard";

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
    const apiUrl = `http://localhost:8080/api/boards/${id}`;
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