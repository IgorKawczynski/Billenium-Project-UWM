import React, {useEffect, useState} from "react";
import {Stack, Grid, Box, Typography, useTheme} from '@mui/material'
import UserMenu from "@/componenets/menus/userMenu/menu";
import BoardCard from "@/componenets/board/boardCard/boardCard";
import ModalUserEditProfile from "@/componenets/userMain/modalUserEditProfile/modalUserEditProfile";
import {userBoardsData} from "@/services/utils/UserUtils/userBoardsData";
import {_Data} from "@/services/utils/boardUtils/DataBoard";
import {fetchBoardsData, loadEmptyBoardsList} from "@/services/actions/userMainService";
import {getUserBoards} from "@/services/utils/UserUtils/userMainUtils";
import ModalAddBoard from "@/componenets/userMain/modalAddBoard/modalAddBoard";
import ModalLeaveBoard from "@/componenets/board/modalLeaveBoard/modalLeaveBoard";
import {useSnackbar} from "notistack";

const UserMain = () => {
    const [modalEdit, setModalEdit] = useState(false);
    const [modalAddBoard, setModalAddBoard] = useState(false);
    const [userBoards, setUserBoards] = useState<userBoardsData['userBoards']>([]);
    const theme = useTheme()
    const {enqueueSnackbar} = useSnackbar();
    const id='1000'

    useEffect(() => {
        if(id){
            fetchBoardsData(setUserBoards, id)
        }
    },[])

    return(
        <Stack
            spacing={2}
            direction={'row'}
            width={'100%'}
        >
                <UserMenu
                    modalEdit={modalEdit}
                    setModalEdit={setModalEdit}
                    setModalAddBoard={setModalAddBoard}
                    setUserBoards={setUserBoards}
                    userId={id}
                />
            <Box width={'100%'}>
                <Typography variant={'h4'} color={theme.palette.text.primary}>
                    Your Boards:
                </Typography>
                <Grid
                    container
                >
                    {
                        userBoards.map((board) => (
                            <BoardCard
                                id={board.boardId}
                                userId={id}
                                title={board.boardTitle}
                                creator={board.creatorName}
                                setUserBoards={setUserBoards}
                            />
                        ))
                    }


                </Grid>

            </Box>
            <ModalUserEditProfile
                firstName={"Maciek"}
                lastName={"Makowski"}
                email={"maciek@wp.pl"}
                modalEdit={modalEdit}
                setModalEdit={setModalEdit}
            />
            <ModalAddBoard
                userId={id}
                modalAddBoard={modalAddBoard}
                setModalAddBoard={setModalAddBoard}
                setUserBoards={setUserBoards}
            />
        </Stack>

    )

}
export default UserMain