import React, {SetStateAction} from "react";
import {userBoardsData} from "@/services/utils/UserUtils/userBoardsData";

export interface BoardCardProps{
    id: string
    userId:string
    title:string
    creator:string
    setUserBoards:userBoardsData["setUserBoards"]
}