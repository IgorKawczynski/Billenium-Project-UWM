import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {openModal} from "@/services/utils/modalUtils/modalUtils";
import {ModalEditCardMenuProps} from "@/components/card/interfaces/modalEditCardMenu/ModalEditCardMenu";
import ColorPicker from "@/components/card/cardColorPicker/ColorPicker";
import ModalEditCardUserList from "@/components/card/modals/modalEditCardUserList/modalEditCardUserList";
import ModalEditCardLockCard from "@/components/card/modals/modalEditCardLockCard/modalEditCardLockCard";
import ChildrenPicker from "@/components/card/cardChilderPicker/ChildrenPicker";
import {useTranslation} from "react-i18next";

const CardMenu = (props:ModalEditCardMenuProps) => {
    const { t } = useTranslation();
    return (
        <Paper sx={{ width: 200, maxWidth: '100%'}}>
            <MenuList>
                <ModalEditCardUserList
                    cardId={props.cardId}
                    cardTitle={props.cardTitle}
                    assignedUsers={props.assignedUsers}
                    data={props.data}
                    setData={props.setData}/>
                <ColorPicker
                    colors={props.data.colorList}
                    data={props.data}
                    setData={props.setData}
                    cardId={props.cardId}
                    cardTitle={props.cardTitle}/>
                <ChildrenPicker
                    cardId={props.cardId}
                    cardTitle={props.cardTitle}
                    children={props.children}
                    data={props.data}
                    setData={props.setData}/>
                <ModalEditCardLockCard
                    cardId={props.cardId}
                    title={props.cardTitle}
                    isLocked={props.isLocked}
                    data={props.data}
                    setData={props.setData}
                />

                <Divider />
                <MenuItem onClick={() => openModal(props.setModalDelete)}>
                    <ListItemIcon>
                        <DeleteOutlinedIcon
                            fontSize="small"
                        />
                    </ListItemIcon>
                    <ListItemText>{t('delete')}</ListItemText>
                </MenuItem>
            </MenuList>
        </Paper>
    );
}

export default CardMenu