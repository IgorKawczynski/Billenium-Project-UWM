import React, {SetStateAction} from "react";
import {userBoardsData} from "@/services/utils/UserUtils/userBoardsData";

export interface ModalAddBoardProps {
    userId:string
    modalAddBoard:boolean
    setModalAddBoard: React.Dispatch<SetStateAction<boolean>>
    setUserBoards: userBoardsData["setUserBoards"]
}