import axios from "axios";
import {_Data} from "../utils/boardUtils/DataBoard";
import React, {SetStateAction} from "react";
import {NavigateFunction} from "react-router-dom";
import {handleClickVariant} from "@/services/utils/toastUtils/toastUtils";
import {enqueueSnackbar} from "notistack";


export const urlDomain = 'http://localhost:8080'

export function loadDefaultData(){
    return {
        id: "0",
        creatorId: "0",
        title: "Kanban",
        creatorName: "Test",
        wipLimit:'',
        assignedUsers: [
            {
                id: "1",
                firstName: "Test",
                lastName: "Test",
                avatarPath: "",
                avatarColor:"",
                remainingAssignments:3
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
                                color: "default",
                                assignedUsers:[],
                                checkboxes:[],
                                isLocked:false,
                                children:[],
                                parentCardId:'0',
                            },
                            {
                                id: "10",
                                title: "Kartka 2",
                                description: "Jakis Opis",
                                position: 1,
                                color: "default",
                                assignedUsers:[],
                                checkboxes:[],
                                isLocked:false,
                                children:[],
                                parentCardId:'0',
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
    }
    return loadDefaultData();
}

export async function moveColumnToBackend(movedObjectId:string, newPosition:number){
    const apiUrl = urlDomain+`/api/columns/move`;
    try {
        const response = await axios.put(apiUrl, {movedObjectId, newPosition});
    } catch (error:any) {
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error;
        }
    }
}

export async function editBoardTitleToBackend(boardId:string, newTitle:string){
    const apiUrl = urlDomain+`/api/boards/${boardId}/title`;
    try {
        const response = await axios.put(apiUrl,null ,{params:{newTitle:newTitle}});
        return response.data
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error;
        }
    }
}
export async function editBoardWipLimitToBackend(boardId:string, newWipLimit:string){
    const apiUrl = urlDomain+`/api/boards/${boardId}/wipLimit`;
    try {
        const response = await axios.put(apiUrl,null ,{params:{newWipLimit:newWipLimit}});
        return response.data
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
            if (error.response && error.response.data && error.response.data.error) {
                return error.response.data.error;
            }
        }
    }
}

export async function getBoardUsersFromBackend(boardId:string){
    const apiUrl = urlDomain+`/api/boards/users/${boardId}`;
    try {
        const response = await axios.get(apiUrl);
        return response.data
    } catch (error:any) {
        if(error.data.error){
            if (error.response && error.response.data && error.response.data.error) {
                return error.response.data.error;
            }
        }
    }
}


export async function assignUserToBoardToBackend(boardId:string,userEmail:string){
    const apiUrl = urlDomain+`/api/boards/assign-user`;
    try {
        const response = await axios.patch(apiUrl, {boardId, userEmail});
        return response.data
    } catch (error:any) {
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error;
        }
    }
}

export async function unassignUserFromBoardOnBackend(boardId:string,userId:string){
    const apiUrl = urlDomain+`/api/boards/delete-user`;
    try {
        const response = await axios.patch(apiUrl, {boardId, userId});
        return response.data
    } catch (error:any) {
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error;
        }
    }
}

export async function passAndLeaveOnBackend(creatorId:string,boardId:string, userIdToPassBoard:string){
    const apiUrl = urlDomain+`/api/boards/pass-leave`;
    try {
        const response = await axios.patch(apiUrl, {creatorId, boardId,userIdToPassBoard});
        return response.data
    } catch (error:any) {
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error;
        }
    }
}

export async function deleteBoardOnBackend(boardId:string){
    const apiUrl = urlDomain+`/api/boards/${boardId}`;
    try {
        const response = await axios.delete(apiUrl);
        return response.data
    } catch (error:any) {
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error;
        }
    }
}

export async function fetchData(
    setData:_Data['setData'],
    boardId:string,
    isAssigned:boolean,
    setIsAssigned:React.Dispatch<SetStateAction<boolean>>,
    navigate:NavigateFunction
) {
    const result = await loadBoardFromBackend(boardId);
    if (result) {
        try {
            result.assignedUsers.map(user => {
                if(user.id == sessionStorage.getItem('userId')){
                    setData(result);
                    setIsAssigned(true);
                    isAssigned = true
                }
            })
            if(!isAssigned){
                navigate('/')
            }
        }
        catch{
            handleClickVariant(enqueueSnackbar)(`Something gone wrong ;c` ,'error')
        }
    }
}