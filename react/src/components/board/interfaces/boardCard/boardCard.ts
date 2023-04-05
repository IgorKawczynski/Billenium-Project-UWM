import {userBoardsData} from "@/services/utils/UserUtils/userBoardsData";
import {activeUser} from "@/services/utils/boardUtils/DataBoard";

export interface BoardCardProps{
    boardId: string
    activeUser:activeUser
    title:string
    creator:string
    creatorId:string
    setUserBoards:userBoardsData["setUserBoards"]
}