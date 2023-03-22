import axios from "axios";
import transformData from "../utils/transfromData/transromData";
import {v4 as uuidv4} from "uuid";
import {_Data} from "../utils/boardUtils/DataBoard";


export const urlDomain = 'http://localhost:8080'

export function loadDefaultData(){
    return {
        id: "0",
        title: "Kanban",
        creatorName: "Test",
        assignedUsers: [
            {
                id: "1",
                firstName: "Test",
                lastName: "Test"
            }
        ],
        columnList: [
            {
                id: "2",
                title: "Todo",
                cardsLimit: 0,
                position: 0,
                cells: [
                    {
                        id: "5",
                        position: 0,
                        cards: [
                            {
                                id: "8",
                                title: "9",
                                description: "Jakis Opis",
                                position: 0,
                                color: "default"
                            },
                            {
                                id: "10",
                                title: "Kartka 2",
                                description: "Jakis Opis",
                                position: 1,
                                color: "default"
                            }
                        ]
                    }
                ]
            },
            {
                id: "3",
                title: "In progress",
                cardsLimit: 3,
                position: 1,
                cells: [
                    {
                        id: "6",
                        position: 0,
                        cards: []
                    }
                ]
            },
            {
                id: "4",
                title: "Done",
                cardsLimit: 0,
                position: 2,
                cells: [
                    {
                        id: "7",
                        position: 0,
                        cards: []
                    }
                ]
            }
        ],
        rowList: [
            {
                id: "11",
                title: "Tasks",
                position: 0
            }
        ],
        colorList: [
            {
                id: "12",
                title: "Color 1",
                value: "default"
            },
            {
                id: "13",
                title: "Color 2",
                value: "default"
            },
            {
                id: "14",
                title: "Color 3",
                value: "default"
            },
            {
                id: "15",
                title: "Color 4",
                value: "default"
            },
            {
                id: "16",
                title: "Color 5",
                value: "default"
            }
        ]
    }
}

export async function loadBoardFromBackend(id: string): Promise<_Data["data"]> {
    const apiUrl = urlDomain+`/api/boards/${id}`;
    try {
        const response = await axios.get(apiUrl);
        if(response.data != null){
            return response.data;
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
    const result = await loadBoardFromBackend("1201");
    if (result) {
        try {
            setData(result);
        }
        catch{
            setData(loadDefaultData())
        }
    }
}