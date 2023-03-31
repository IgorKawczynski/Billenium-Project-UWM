import axios from "axios";
import {urlDomain} from "@/services/actions/boardService";
import {userBoardsData} from "@/services/utils/UserUtils/userBoardsData";

export function loadEmptyBoardsList(): { userBoards: userBoardsData["userBoards"] } {
    return {
        userBoards: [
            {
                boardId: "",
                boardTitle: "",
                creatorName: ""
            }
        ]
    };
}


export async function getUserBoardsFromBackend(userId:string){
    try{
        const response = await axios.get(urlDomain+`/api/users/${userId}/boards`)
        return response.data
    }catch(error:any){
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error;
        }
    }

}

export async function addBoardToBackend(userId:string, title:string){
    try{
        const response = await axios.post(urlDomain+`/api/boards`, {userId, title})
        return response.data
    }catch(error:any){
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error;
        }
    }

}

export async function deleteBoardFromBackend(boardId:string){
    try{
        const response = await axios.delete(urlDomain+`/api/boards/${boardId}`)
        return response.data
    }catch(error:any){
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error;
        }
    }

}

export async function fetchBoardsData(setUserBoards:userBoardsData['setUserBoards'], userId:string) {
    const result = await getUserBoardsFromBackend(userId);
    if (result) {
        try {
            setUserBoards(result);
        }catch {}
    }
}

