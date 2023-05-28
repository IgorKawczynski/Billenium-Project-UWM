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
import {useTranslation} from "react-i18next";

const UserMain = () => {
    const [modalEdit, setModalEdit] = useState(false);
    const [modalAddBoard, setModalAddBoard] = useState(false);
    const [activeUser, setActiveUser] = useState<activeUser>({ id:"", firstName:"", lastName:"", email:"", avatarPath:"", avatarColor:""})
    const [userBoards, setUserBoards] = useState<userBoardsData['userBoards']>([]);
    const colorMode = React.useContext(ColorModeContext);
    const {userId} = useParams()
    const theme = useTheme()
    const navigate = useNavigate()
    const { t } = useTranslation()


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
                            {t('yourBoards')}
                        </Typography>
                        <Grid
                            container
                        >
                            {
                                userBoards && userId && (
                                    userBoards.map((board) => (
                                        <BoardCard
                                            key={board.boardId}
                                            boardId={board.boardId}
                                            activeUser={activeUser}
                                            title={board.boardTitle}
                                            creator={board.creatorName}
                                            creatorId={board.creatorId}
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
                                            {t('youDontHaveAnyBoardsYet')}.
                                        </Typography>
                                        <Typography variant={'body1'} color={theme.palette.text.primary}>
                                            {t('maybeTryToAddOne')}.
                                        </Typography>
                                    </Grid>
                                )
                            }


                        </Grid>

                    </Box>

                    <ModalUserEditProfile
                        key={activeUser.id}
                        activeUser={activeUser}
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