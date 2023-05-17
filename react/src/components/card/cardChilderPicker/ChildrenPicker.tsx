import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Box from "@mui/material/Box"
import {StyledMenu} from "@/assets/styles/styledMenu";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
import {useTheme} from "@mui/material";
import {ChildrenPickerProps} from "@/components/card/interfaces/childrenPicker/ChildrenPicker";
import ChildrenPickerItem from "@/components/card/cardChilderPicker/ChildrenPickerItem/childrenPickerItem";

const ChildrenPicker = (props:ChildrenPickerProps) => {
    const theme = useTheme()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
        <MenuItem
            id="demo-customized-button"
            aria-controls={open ? 'demo-customized-boardMenu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
        >
            <ListItemIcon>
                <EscalatorWarningIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Children</ListItemText>
        </MenuItem>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {props.children.map((child) => {
                    return(
                            <ChildrenPickerItem
                                cardId={props.cardId}
                                childId={child.id}
                                childTitle={child.title}
                                setAnchorEl={setAnchorEl}
                                data={props.data}
                                setData={props.setData}
                            />
                    )
                })}

            </StyledMenu>
        </Box>
    );
}

export default ChildrenPicker