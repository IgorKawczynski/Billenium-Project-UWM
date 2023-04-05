import {
    addBoardToBackend,
    changeUserAvatarOnBackend,
    deleteUserAvatarOnBackend,
    getUserBoardsFromBackend,
    getUserFromBackend
} from "@/services/actions/userMainService";
import {userBoardsData} from "@/services/utils/UserUtils/userBoardsData";
import React, {SetStateAction} from "react";
import {closeModal} from "@/services/utils/modalUtils/modalUtils";
import {handleClickVariant} from "@/services/utils/toastUtils/toastUtils";
import {enqueueSnackbar} from "notistack";
import {unassignUserFromBoardOnBackend} from "@/services/actions/boardService";


export function getUserBoards  (
    userId:string,
    setUserBoards:userBoardsData["setUserBoards"]
)  {
    getUserBoardsFromBackend(userId)
        .then( res => {
            setUserBoards(res)
        })
}
export function changeAvatar  (
    userId:string,
    avatarImage:FormData,
    setActiveUser:any
)  {
    changeUserAvatarOnBackend(userId, avatarImage)
        .then( res => {
            if (typeof res === 'string') {
                handleClickVariant(enqueueSnackbar)(res, 'error')
            } else {
                getUserFromBackend(userId)
                    .then(res => {
                        setActiveUser(res)
                        handleClickVariant(enqueueSnackbar)(`User avatar added, please refresh page.` ,'success')
                    })
            }
        })
}
export function deleteAvatar(
    userId:string,
    setActiveUser:any,
    setAvatarDelete:React.Dispatch<SetStateAction<boolean>>
)  {
    deleteUserAvatarOnBackend(userId)
        .then( res => {
            getUserFromBackend(userId)
                .then(res => {
                    setActiveUser(res)
                    closeModal(setAvatarDelete)
                })
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
                if (typeof res === 'string') {
                    handleClickVariant(enqueueSnackbar)(res, 'error')
                } else {
                    getUserBoards(userId, setUserBoards)
                    closeModal(setModalAddBoard)
                    handleClickVariant(enqueueSnackbar)(`Board ${title} added` ,'success')
                    setBoardName("")
                }
            }
        )
}

export function leaveBoard(
    userId:string,
    boardId:string,
    title:string,
    setUserBoards:userBoardsData["setUserBoards"],
    setModalDelete:React.Dispatch<SetStateAction<boolean>>
){
    unassignUserFromBoardOnBackend(boardId,userId)
        .then(res => {
                getUserBoards(userId, setUserBoards)
                closeModal(setModalDelete)
                handleClickVariant(enqueueSnackbar)(`Now you are unassigned from board: ${title}` ,'warning')

        })
}