import React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {StyledMenu} from "@/assets/styles/styledMenu";
import {ModalEditCardUserListProps} from "@/components/card/interfaces/modalEditCardUserList/modalEditCardUserList";
import ModalEditCardUserListItem from "@/components/card/modals/modalEditCardUserListItem/modalEditCardUserListItem";
import GroupIcon from "@mui/icons-material/Group";
import {useTranslation} from "react-i18next";
import {Typography} from "@mui/material";


const ModalEditCardUserList = (props:ModalEditCardUserListProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { t } = useTranslation();
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
    <Box>
        <MenuItem
            id="demo-customized-button"
            aria-controls={open ? 'demo-customized-boardMenu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
        >
            <ListItemIcon>
                <GroupIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{t('users')}</ListItemText>
        </MenuItem>
        <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
                'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={{zIndex:'10'}}
        >
            {props.assignedUsers.length !== 0 && props.assignedUsers.map((user) => (
                <Box key={user.id}>
                    <ModalEditCardUserListItem
                        userId={user.id}
                        userName={user.firstName}
                        userLastName={user.lastName}
                        userAvatarPath={user.avatarPath}
                        userAvatarColor={user.avatarColor}
                        cardId={props.cardId}
                        cardTitle={props.cardTitle}
                        setAnchorEl={setAnchorEl}
                        data={props.data}
                        setData={props.setData}
                    />
                </Box>
            ))
            }
            {props.assignedUsers.length === 0 && (
                <MenuItem>
                    <Box
                        width={'100%'}
                        display={"flex"}
                        justifyContent={"space-between"}
                    >
                        <Typography variant={"body1"}>
                            {t('UserListEmpty')}
                        </Typography>
                        <Box
                            display={"flex"}
                            justifyContent={"end"}
                            alignItems={"center"}
                            width={'100%'}
                        >
                        </Box>
                    </Box>
                </MenuItem>
            )}


        </StyledMenu>
    </Box>
    )
}

export default ModalEditCardUserList
