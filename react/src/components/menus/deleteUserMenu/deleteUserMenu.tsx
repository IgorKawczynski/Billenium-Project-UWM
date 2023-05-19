import React from "react";
import {Box, Drawer, IconButton, Stack, useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";
import DeleteUserMenuItem from "@/components/menus/deleteUserMenuItem/deleteUserMenuItem";
import {DeleteUserMenuProps} from "@/components/menus/interfaces/deleteUserMenu";
import CloseIcon from "@mui/icons-material/Close";
import {closeModal} from "@/services/utils/modalUtils/modalUtils";
import {useTranslation} from "react-i18next";


const DeleteUserMenu = (props:DeleteUserMenuProps) => {
    const theme = useTheme()
    const { t } = useTranslation();
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
                    {t('chooseUserToRemove')}
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
                            key={user.id}
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
