import React, {SetStateAction} from "react";
import {userBoardsData} from "@/services/utils/UserUtils/userBoardsData";

export interface ModalLeaveBoardProps {
    id:string
    userId:string
    title:string
    modalDelete:boolean
    setModalDelete:React.Dispatch<SetStateAction<boolean>>
    setUserBoards:userBoardsData["setUserBoards"]
}