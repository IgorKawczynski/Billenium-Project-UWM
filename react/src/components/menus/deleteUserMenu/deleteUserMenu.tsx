import React from "react";
import {Box, Drawer, IconButton, Stack, useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";
import DeleteUserMenuItem from "@/components/menus/deleteUserMenuItem/deleteUserMenuItem";
import {DeleteUserMenuProps} from "@/components/menus/interfaces/deleteUserMenu";
import CloseIcon from "@mui/icons-material/Close";
import {closeModal} from "@/services/utils/modalUtils/modalUtils";


const DeleteUserMenu = (props:DeleteUserMenuProps) => {
    const theme = useTheme()

    return(
        <Drawer
            variant={"persistent"}
            anchor={"right"}
            open={props.modalDeleteUser}
            onClose={() => props.setModalDeleteUser( false)}
        >
            <Stack
                padding={2}
                minWidth={'250px'}
                spacing={2}
            >
                <Box display={"flex"}>
                <Typography variant={'h6'} color={theme.palette.text.primary}>
                    Choose user to remove
                </Typography>
                    <IconButton
                        sx={{
                            maxHeight:'35px',
                            maxWidth:'35px'
                        }}
                        onClick={() => closeModal(props.setModalDeleteUser)}
                    >
                        <CloseIcon/>
                    </IconButton>
                </Box>
                {props.assignedUsers.map(user => {
                    return(
                        <DeleteUserMenuItem
                            userId={user.id}
                            userName={user.firstName}
                            userLastName={user.lastName}
                            userAvatarPath={user.avatarPath}
                            userAvatarColor={user.avatarColor}
                            data={props.data}
                            setData={props.setData}
                        />
                        )
                }
                )}

            </Stack>

        </Drawer>
    )
}
export default DeleteUserMenu
