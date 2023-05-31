import React, {SetStateAction} from "react";
import {userBoardsData} from "@/services/utils/UserUtils/userBoardsData";
import {activeUser} from "@/services/utils/boardUtils/DataBoard";

export interface ModalLeaveBoardProps {
    boardId:string
    activeUser:activeUser
    title:string
    creatorId:string
    modalDelete:boolean
    setModalDelete:React.Dispatch<SetStateAction<boolean>>
    setUserBoards:userBoardsData["setUserBoards"]
}