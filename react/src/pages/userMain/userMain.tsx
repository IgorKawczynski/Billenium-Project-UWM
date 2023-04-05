import React, {useEffect, useState} from "react";
import {Box, Grid, Stack, Typography, useTheme} from '@mui/material'
import UserMenu from "@/components/menus/userMenu/menu";
import BoardCard from "@/components/board/boardCard/boardCard";
import ModalUserEditProfile from "@/components/userMain/modalUserEditProfile/modalUserEditProfile";
import {userBoardsData} from "@/services/utils/UserUtils/userBoardsData";
import {fetchBoardsData, getUserFromBackend} from "@/services/actions/userMainService";
import ModalAddBoard from "@/components/userMain/modalAddBoard/modalAddBoard";
import {useNavigate, useParams} from "react-router-dom";
import {ColorModeContext} from "@/App";
import {activeUser} from "@/services/utils/boardUtils/DataBoard";

const UserMain = () => {
    const [modalEdit, setModalEdit] = useState(false);
    const [modalAddBoard, setModalAddBoard] = useState(false);
    const [activeUser, setActiveUser] = useState<activeUser>({ id:"", firstName:"", lastName:"", email:"", avatarPath:"", avatarColor:""})
    const [userBoards, setUserBoards] = useState<userBoardsData['userBoards']>([]);
    const colorMode = React.useContext(ColorModeContext);
    const {userId} = useParams()
    const theme = useTheme()
    const navigate = useNavigate()


    if(userId && userId != sessionStorage.getItem('userId')){
        navigate('/')
    }

    React.useEffect(() => {
        // Pobieranie elementu body i ustawienie stylu tła
        document.body.style.backgroundColor = theme.palette.background.default;
    }, [theme]);
    useEffect(() => {
        if(userId && userId === sessionStorage.getItem('userId')){
            fetchBoardsData(setUserBoards, userId)
            getUserFromBackend(userId)
                .then(res => {
                    if(res){
                        setActiveUser(res)
                    }
                })
        }
    },[])


    return(
        <>
        {sessionStorage.getItem('sessionId') &&
            userId === sessionStorage.getItem('userId') &&
            activeUser.id != "" &&
            (
                <Stack
                    spacing={2}
                    direction={'row'}
                    width={'100%'}
                >
                    {userId &&
                        <UserMenu
                            modalEdit={modalEdit}
                            setModalEdit={setModalEdit}
                            setModalAddBoard={setModalAddBoard}
                            setUserBoards={setUserBoards}
                            userId={userId}
                        />
                    }
                    <Box width={'100%'}>
                        <Typography variant={'h4'} color={theme.palette.text.primary}>
                            Your Boards:
                        </Typography>
                        <Grid
                            container
                        >
                            {
                                userBoards && userId && (
                                    userBoards.map((board) => (
                                        <BoardCard
                                            key={board.boardId}
                                            id={board.boardId}
                                            userId={userId}
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
                        key={activeUser.id}
                        userId={activeUser.id}
                        firstName={activeUser.firstName}
                        lastName={activeUser.lastName}
                        email={activeUser.email}
                        avatarPath={activeUser.avatarPath}
                        avatarColor={activeUser.avatarColor}
                        modalEdit={modalEdit}
                        setModalEdit={setModalEdit}
                        setActiveUser={setActiveUser}
                    />
                    {userId &&
                        <ModalAddBoard
                            userId={userId}
                            modalAddBoard={modalAddBoard}
                            setModalAddBoard={setModalAddBoard}
                            setUserBoards={setUserBoards}
                        />
                    }
                </Stack>
            )}
        </>
        )
}
export default UserMain