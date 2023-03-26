import React, {useState} from "react";
import {Drawer, Box, Grid, InputLabel, FormControl, Stack, useTheme, Typography, Tooltip} from "@mui/material";
import {BoardUsersProps} from "@/componenets/board/interfaces/boardUsers/boardUsers";
import OutlinedInput from "@mui/material/OutlinedInput";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import { Droppable} from "react-beautiful-dnd";
import UserAvatar from "@/componenets/users/avatar/userAvatar";
import GroupIcon from "@mui/icons-material/Group";

const BoardUsers = (props:BoardUsersProps) => {
    const [email, setEmail] = useState("")
    const theme = useTheme()
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

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
                <Box>
                    <Typography variant={"caption"}>
                            Add your member here
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
                                        aria-label="toggle password visibility"
                                        edge="end"
                                    >
                                        <PersonAddAlt1Icon/>
                                    </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Box>
                <Droppable
                    droppableId={"AvatarBox"}
                    direction={'horizontal'}
                    type={'user'}>
                    {(provided, snapshot) =>(
                        <Box
                            {...provided.droppableProps}
                            ref={provided.innerRef}

                        >
                            <Typography variant={"caption"}>
                                Drag your member to card
                            </Typography>
                            <Grid
                                container
                                marginTop={1}
                                border={`1px dashed ${theme.palette.text.secondary} `}
                                minHeight={'30px'}
                                padding={1}
                                spacing={1}
                                flexWrap={'wrap'}
                                direction={"row"}
                            >
                                <UserAvatar key={'userID'}
                                            userId={'123'}
                                            setUsers={props.setUsers}
                                            name={"Maciek"}
                                            lastName={"Makowski"}
                                />
                                <UserAvatar key={'userID2'}
                                            userId={'321'}
                                            setUsers={props.setUsers}
                                            name={"Grzegorz"}
                                            lastName={"Koks"}
                                />



                                {provided.placeholder}
                            </Grid>
                        </Box>


                    )}
                </Droppable>

            </Stack>

        </Drawer>

    )
}
export default BoardUsers
