import {getUserBoardsFromBackend, addBoardToBackend, deleteBoardFromBackend} from "@/services/actions/userMainService";
import {userBoardsData} from "@/services/utils/UserUtils/userBoardsData";
import React, {SetStateAction} from "react";
import {closeModal} from "@/services/utils/modalUtils/modalUtils";
import {handleClickVariant} from "@/services/utils/toastUtils/toastUtils";
import {enqueueSnackbar} from "notistack";


export function getUserBoards  (
    userId:string,
    setUserBoards:userBoardsData["setUserBoards"]
)  {
    getUserBoardsFromBackend(userId)
        .then( res => {
            setUserBoards(res)
        })
}


export function addBoard (
    userId:string,
    title:string,
    setUserBoards:userBoardsData["setUserBoards"],
    setModalAddBoard:React.Dispatch<SetStateAction<boolean>>,
    setBoardName:React.Dispatch<SetStateAction<string>>
) {
    addBoardToBackend(userId, title)
        .then( res => {
                getUserBoards(userId, setUserBoards)
                closeModal(setModalAddBoard)
                handleClickVariant(enqueueSnackbar)(`Board ${title} Added` ,'success')
                setBoardName("")
            }
        )
}

export function deleteBoard(
    userId:string,
    boardId:string,
    setUserBoards:userBoardsData["setUserBoards"],
    setModalDelete:React.Dispatch<SetStateAction<boolean>>
){
    deleteBoardFromBackend(boardId)
        .then(res => {
            getUserBoards(userId, setUserBoards)
            closeModal(setModalDelete)
        })
}