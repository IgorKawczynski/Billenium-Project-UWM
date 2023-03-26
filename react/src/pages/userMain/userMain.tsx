import React, {useEffect, useState} from "react";
import {Stack, Grid, Box, Typography, useTheme} from '@mui/material'
import UserMenu from "@/componenets/menus/userMenu/menu";
import BoardCard from "@/componenets/board/boardCard/boardCard";
import ModalUserEditProfile from "@/componenets/userMain/modalUserEditProfile/modalUserEditProfile";
import {userBoardsData} from "@/services/utils/UserUtils/userBoardsData";
import {fetchBoardsData} from "@/services/actions/userMainService";
import ModalAddBoard from "@/componenets/userMain/modalAddBoard/modalAddBoard";

const UserMain = () => {
    const [modalEdit, setModalEdit] = useState(false);
    const [modalAddBoard, setModalAddBoard] = useState(false);
    const [userBoards, setUserBoards] = useState<userBoardsData['userBoards']>([]);
    const theme = useTheme()
    const id='1000'

    useEffect(() => {
        if(id){
            fetchBoardsData(setUserBoards, id)
        }
    },[])

    // @ts-ignore
    // @ts-ignore
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
                        userBoards && (
                            userBoards.map((board) => (
                                <BoardCard
                                    id={board.boardId}
                                    userId={id}
                                    title={board.boardTitle}
                                    creator={board.creatorName}
                                    setUserBoards={setUserBoards}
                                />
                            ))
                        )
                    }
                    {
                        //@ts-ignore
                        userBoards == "" && (
                            <Grid item xs={12}>
                                <Typography variant={'h6'} color={theme.palette.text.hard}>
                                    You dont have any boards yet.
                                </Typography>
                                <Typography variant={'body1'} color={theme.palette.text.primary}>
                                    Maybe try to add one.
                                </Typography>
                            </Grid>
                        )
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