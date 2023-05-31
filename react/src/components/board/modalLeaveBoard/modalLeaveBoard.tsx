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
import {leaveBoard} from "@/services/utils/UserUtils/userMainUtils";
import {assignedUser} from "@/services/utils/boardUtils/DataBoard";
import {getUsers} from "@/services/utils/boardUtils/boardUtils";


const ModalLeaveBoard = (props:ModalLeaveBoardProps) =>{
    const [newCreator, setNewCreator] = useState(props.activeUser.id)
    const [users, setUsers] = useState<assignedUser[]>([])
    useEffect(() =>{
        getUsers(props.boardId, setUsers)
    },[])
    const handleChange = (event: SelectChangeEvent<string>) => {
        const x = event.target.value
        setNewCreator(x);
    };
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
                        <Typography color={'textPrimary'} variant={'body1'}>
                            Are you sure you want to leave board: {props.title}?
                        </Typography>
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
                            variant="contained"
                        >
                            Cancel
                        </Button>

                        {props.activeUser.id != props.creatorId && (
                            <Button
                                sx={{maxHeight:'50px'}}
                                variant="contained"
                                onClick={() => leaveBoard(
                                    props.activeUser.id,
                                    props.boardId,
                                    props.title,
                                    props.setUserBoards,
                                    props.setModalDelete
                                )}
                            >
                                Leave
                            </Button>
                        )}
                        {props.activeUser.id == props.creatorId && (
                            <Box
                                display={"flex"}
                                sx={{alignItems:"center"}}
                                height={'100%'}
                            >
                                <FormControl sx={{ m: 1, width: 300 }}>
                                    <InputLabel>Select new owner</InputLabel>
                                    <Select
                                        value={newCreator}
                                        onChange={handleChange}
                                        input={<OutlinedInput label="Select new owner" />}
                                    >
                                        {users.map((user) => (
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
                                        ))}
                                    </Select>
                                </FormControl>
                                <Button
                                    sx={{maxHeight:'40px'}}
                                    variant="contained"
                                >
                                    Leave
                                </Button>
                            </Box>
                        )}

                    </Grid>
                </Stack>
            </Fade>
        </Modal>
    )

}
export default ModalLeaveBoard
