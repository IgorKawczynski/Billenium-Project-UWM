import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Box from "@mui/material/Box"
import {StyledMenu} from "@/assets/styles/styledMenu";
import ListItemIcon from "@mui/material/ListItemIcon";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import ListItemText from "@mui/material/ListItemText";
import CardColor from "@/assets/themes/colors";
import CardColorPickerItem from "@/componenets/cardColorPickerItem/cardColorPickerItem";
import {useTheme} from "@mui/material";

const ColorPicker = () => {
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
        <>
        <MenuItem
            id="demo-customized-button"
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
        >
            <ListItemIcon>
                <ColorLensIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Color</ListItemText>
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
                <CardColorPickerItem color={theme.palette.text.secondary} title={"Default"} handleClose={handleClose}/>
                <CardColorPickerItem color={CardColor.purple} title={"Color 1"} handleClose={handleClose}/>
                <CardColorPickerItem color={CardColor.blue} title={"Color 2"} handleClose={handleClose}/>
                <CardColorPickerItem color={CardColor.green} title={"Color 3"} handleClose={handleClose}/>
                <CardColorPickerItem color={CardColor.yellow} title={"Color 4"} handleClose={handleClose}/>
                <CardColorPickerItem color={CardColor.red} title={"Color 5"} handleClose={handleClose}/>

            </StyledMenu>
        </>
    );
}

export default ColorPicker