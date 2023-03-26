import React, {SetStateAction} from "react";
import {userBoard, userBoardsData} from "@/services/utils/UserUtils/userBoardsData";

export interface UserMenuProps{
    modalEdit:boolean,
    setModalEdit: React.Dispatch<SetStateAction<boolean>>
    setModalAddBoard: React.Dispatch<SetStateAction<boolean>>
    setUserBoards: userBoardsData["setUserBoards"]
    userId:string
}