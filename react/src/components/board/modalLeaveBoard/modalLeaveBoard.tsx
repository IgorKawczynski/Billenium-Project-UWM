import React, {useEffect, useState} from "react";
import Modal from "@mui/material/Modal";
import {closeModal} from "@/services/utils/modalUtils/modalUtils";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Stack from "@mui/material/Stack";
import {modalStyle} from "@/assets/themes/modalStyle";
import {
    Avatar,
    Box,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {ModalLeaveBoardProps} from "@/components/board/interfaces/modalLeaveBoard/modalLeaveBoard";
import {deleteBoard, leaveBoard, passAndLeave} from "@/services/utils/UserUtils/userMainUtils";
import {assignedUser} from "@/services/utils/boardUtils/DataBoard";
import {getUsers} from "@/services/utils/boardUtils/boardUtils";
import {useTranslation} from "react-i18next";
import {handleClickVariant} from "@/services/utils/toastUtils/toastUtils";
import {enqueueSnackbar} from "notistack";


const ModalLeaveBoard = (props:ModalLeaveBoardProps) =>{
    const [users, setUsers] = useState<assignedUser[]>([])
    const [newCreator, setNewCreator] = useState('')
    const { t } = useTranslation();
    useEffect(() =>{
        getUsers(props.boardId, setUsers, setNewCreator)
    },[])
    useEffect(() =>{
        if(users.length > 1){
            users.map(user => {
                if(user.id !== props.activeUser.id){
                    setNewCreator(user.id)
                }

            })
        }
    },[users])

    const handleChange = (event: SelectChangeEvent) => {
        const user = event.target.value
        setNewCreator(user);
    };
    const handleChangeCreator = () =>{
        if(newCreator === ''){
            handleClickVariant(enqueueSnackbar)('Select new owner' ,'error')
        }else if(newCreator.length > 1 && newCreator !== ''){
            passAndLeave(
                t,
                props.activeUser.id,
                props.boardId,
                newCreator,
                props.title,
                props.setUserBoards,
                props.setModalDelete
            )
        }
    }
    return(
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={props.modalDelete}
            onClose={() => closeModal(props.setModalDelete)}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={props.modalDelete}>
                <Stack sx={modalStyle} spacing={3}>
                    <Box style={{
                        display:"flex",
                        textAlign:'center',
                        justifyContent:"center",
                        alignItems:"center"
                        }}
                    >
                            {props.activeUser.id === props.creatorId  && users.length === 1 && (
                                <Typography color={'textPrimary'} variant={'body1'}>
                                {t('deletingMess')}: {props.title}?
                                </Typography>
                            )}
                            {props.activeUser.id !== props.creatorId && (
                                <Typography color={'textPrimary'} variant={'body1'}>
                                {t('leaveBoardMessage')}: {props.title}?
                                </Typography>
                                )}
                        {props.activeUser.id === props.creatorId  && users.length > 1 && (
                            <Typography color={'textPrimary'} variant={'body1'}>
                                {t('leaveBoardMessage')}: {props.title}?
                            </Typography>
                        )}
                    </Box>
                    <Grid style={{
                        display:"flex",
                        justifyContent:"space-between",
                        width:"100%",
                        alignItems:"center"
                        }}
                    >
                        <Button
                            sx={{maxHeight:'40px'}}
                            onClick={() => closeModal(props.setModalDelete)}
                            variant="outlined"
                        >
                            {t('cancel')}
                        </Button>

                        {props.activeUser.id !== props.creatorId && (
                            <Button
                                sx={{maxHeight:'50px'}}
                                variant="contained"
                                onClick={() => leaveBoard(
                                    t,
                                    props.activeUser.id,
                                    props.boardId,
                                    props.title,
                                    props.setUserBoards,
                                    props.setModalDelete
                                )}
                            >
                                {t('leave')}
                            </Button>
                        )}
                        {props.activeUser.id === props.creatorId  && users.length > 1 && (
                            <Box
                                display={"flex"}
                                sx={{alignItems:"center"}}
                                height={'100%'}
                            >
                                <FormControl sx={{ m: 1, width: 300 }}>
                                    <InputLabel>{t('selectNewOwner')}</InputLabel>
                                    <Select
                                        value={newCreator}
                                        onChange={handleChange}
                                        input={<OutlinedInput label={t('selectNewOwner')}/>}
                                    >
                                        {users.map((user) => (
                                            user.id !== props.activeUser.id && (
                                                    <MenuItem
                                                        key={user.id}
                                                        value={user.id}
                                                    >
                                                        <Box
                                                            display={"flex"}
                                                            width={'100%'}
                                                            justifyContent={"space-between"}
                                                            alignItems={"center"}
                                                        >
                                                            <Avatar
                                                                src={user.avatarPath && user.avatarPath }
                                                                sx={{
                                                                    width: 35,
                                                                    height: 35,
                                                                    marginRight:1,
                                                                    bgcolor:user.avatarColor
                                                                }}
                                                            >
                                                                <Typography variant={"body1"}>
                                                                    {user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()}
                                                                </Typography>
                                                            </Avatar>
                                                            {user.firstName + " " + user.lastName}
                                                        </Box>
                                                    </MenuItem>
                                                )
                                        ))}
                                    </Select>
                                </FormControl>
                                <Button
                                    sx={{maxHeight:'50px'}}
                                    variant="contained"
                                    onClick={() => handleChangeCreator()}
                                >
                                    {t('leave')}
                                </Button>
                            </Box>
                        )}
                        {props.activeUser.id === props.creatorId  && users.length === 1 && (
                                <Button
                                    sx={{maxHeight:'50px'}}
                                    variant="contained"
                                    onClick={() => deleteBoard(
                                        t,
                                        props.activeUser.id,
                                        props.boardId,
                                        props.title,
                                        props.setUserBoards,
                                        props.setModalDelete
                                    )}
                                >
                                    {t('delete')}
                                </Button>
                        )}
                    </Grid>
                </Stack>
            </Fade>
        </Modal>
    )

}
export default ModalLeaveBoard
