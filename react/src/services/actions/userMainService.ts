import axios from "axios";
import {urlDomain} from "@/services/actions/boardService";
import {userBoardsData} from "@/services/utils/UserUtils/userBoardsData";
import {activeUser} from "@/services/utils/boardUtils/DataBoard";

export function loadEmptyBoardsList(): { userBoards: userBoardsData["userBoards"] } {
    return {
        userBoards: [
            {
                boardId: "",
                boardTitle: "",
                creatorName: "",
                creatorId:""
            }
        ]
    };
}

export async function getUserFromBackend(userId:string): Promise<activeUser | undefined>{
    try{
        const response = await axios.get(urlDomain+`/api/users/${userId}`)
        return response.data
    }catch(error:any){
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error;
        }
    }

}

export async function changeUserAvatarOnBackend(userId:string, avatarImage:FormData){
    try{
        const response = await axios.put(urlDomain+`/api/users/${userId}/avatar`,avatarImage, {
            headers: {
                "Content-Type": "multipart/form-data"
            }}
    )
        return response.data
    }catch(error:any){
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error;
        }
    }

}
export async function deleteUserAvatarOnBackend(userId:string){
    try{
        const response = await axios.delete(urlDomain+`/api/users/${userId}/avatar`)
        return response.data
    }catch(error:any){
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error;
        }
    }

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

export async function changePasswordOnBackend(userId:string, oldPassword:string, newPassword:string){
    try{
        const response = await axios.patch(urlDomain+`/api/users/password`, {userId, oldPassword,newPassword})
        return response
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

