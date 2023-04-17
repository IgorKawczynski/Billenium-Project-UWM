import React, {useState} from "react";
import {Box, Button, Drawer, FormControl, InputLabel, Stack, Tooltip, Typography, useTheme} from "@mui/material";
import {BoardUsersProps} from "@/components/board/interfaces/boardUsers/boardUsers";
import OutlinedInput from "@mui/material/OutlinedInput";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import GroupIcon from "@mui/icons-material/Group";
import {assignUserToBoard} from "@/services/utils/boardUtils/boardUtils";
import {openModal} from "@/services/utils/modalUtils/modalUtils";
import DeleteUserMenu from "@/components/menus/deleteUserMenu/deleteUserMenu";
import UsersAvatars from "@/components/users/usersAvatars/usersAvatars";
import EditBoardWipLimit from "@/components/board/editBoardWipLimit/editBoardWipLimit";

const BoardUsersMenu = (props:BoardUsersProps) => {
    const [email, setEmail] = useState("")
    const [modalDeleteUser, setModalDeleteUser] = useState(false)
    const [wipLimit, setWipLimit] = useState(props.data.wipLimit);
    const theme = useTheme()
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }
    const handleWipLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(parseInt(event.target.value) > 0){
            setWipLimit(event.target.value);
        }else{
            setWipLimit('0')
        }
    };

    return(
        <Drawer
            variant={"persistent"}
            anchor={"left"}
            open={props.users}
            onClose={() => props.setUsers( false)}
        >
            <Stack
                padding={2}
                width={'250px'}
                spacing={2}
            >
                <Box
                display={"flex"}
                justifyContent={"end"}
                alignItems={"center"}
                >
                    <GroupIcon/>
                    <Typography
                        variant={'h6'}
                        color={theme.palette.text.primary}
                        width={'100%'}
                    >
                        Users Management
                    </Typography>
                    <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                        onClick={() => props.setUsers( false)}
                    >
                        <CloseIcon/>
                    </IconButton>

                </Box>
                <Stack spacing={2}>
                    <EditBoardWipLimit text={wipLimit} setText={setWipLimit} handleTextChange={handleWipLimitChange} data={props.data} setData={props.setData}/>
                    <Typography variant={"caption"}>
                            Assign member to board
                    </Typography>
                    <FormControl variant="outlined">
                        <InputLabel>Email</InputLabel>
                        <OutlinedInput
                            sx={{margin:'0 0 8px 0'}}
                            id="outlined-basic"
                            label="Email"
                            inputMode={"email"}
                            value={email}
                            onChange={handleEmailChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Tooltip
                                        title={"Add user"}
                                        placement={'top'}
                                    >
                                    <IconButton
                                        onClick={() => assignUserToBoard(props.data.id, email, props.data, props.setData)}
                                        edge="end"
                                    >
                                        <PersonAddAlt1Icon/>
                                    </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Stack>
                {sessionStorage.getItem('userId') == props.data.creatorId && (
                    <Button
                        onClick={() => openModal(setModalDeleteUser)}
                    >
                        Delete user from board
                    </Button>
                )}

                <Typography variant={"caption"}>
                    Drag member to card
                </Typography>

                <UsersAvatars setData={props.setData} data={props.data} setUsers={props.setUsers}/>
            </Stack>
            <DeleteUserMenu
                assignedUsers={props.data.assignedUsers}
                data={props.data}
                setData={props.setData}
                modalDeleteUser={modalDeleteUser}
                setModalDeleteUser={setModalDeleteUser}
            />

        </Drawer>

    )
}
export default BoardUsersMenu
