import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Box from "@mui/material/Box"
import {StyledMenu} from "@/assets/styles/styledMenu";
import ListItemIcon from "@mui/material/ListItemIcon";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import ListItemText from "@mui/material/ListItemText";
import CardColorPickerItem from "@/components/card/cardColorPickerItem/cardColorPickerItem";
import {useTheme} from "@mui/material";
import {ColorPickerProps} from "@/components/color/interfaces/ColorPicker/colorPicker";
import {useTranslation} from "react-i18next";

const ColorPicker = (props:ColorPickerProps) => {
    const theme = useTheme()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { t } = useTranslation();
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
                <ColorLensIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{t('color')}</ListItemText>
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
                {props.colors.map((color) => (
                    <Box key={color.id}>
                    {color.value == "default" && (
                    <CardColorPickerItem
                        cardId={props.cardId}
                        cardTitle={props.cardTitle}
                        colorId={color.id}
                        colorValue={color.value}
                        color={theme.palette.text.secondary}
                        title={t('default')}
                        setAnchorEl={setAnchorEl}
                        data={props.data}
                        setData={props.setData}
                    />
                    )}
                    {color.value != 'default' &&(
                    <CardColorPickerItem
                        cardId={props.cardId}
                        cardTitle={props.cardTitle}
                        colorId={color.id}
                        colorValue={color.value}
                        color={color.value}
                        title={color.title}
                        setAnchorEl={setAnchorEl}
                        data={props.data}
                        setData={props.setData}
                    />
                    )}
                    </Box>
                ))}


            </StyledMenu>
        </Box>
    );
}

export default ColorPicker