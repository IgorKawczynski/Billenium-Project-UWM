import React, {useEffect, useState, useContext} from 'react'
import Box from '@mui/material/Box'
import Typography from "@mui/material/Typography";
import '../../App.css'
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Student from '../../resources/imgs/student.png'
import Gif from '../../resources/gifs/gifTwo.gif'
import FirmwareGif from '../../resources/gifs/Firmware.gif'
import ServerGif from '../../resources/gifs/Server.gif'
import TwoPerson from '../../resources/imgs/org_2pers.png'
import ServerPng from '../../resources/imgs/Server.png'
import FirmwarePng from '../../resources/imgs/Firmware.png'
import {Link} from "react-router-dom";
import {useTheme, makeStyles} from "@mui/material/styles";
import { ColorModeContext } from '../../App';
import Brightness4Icon from '@mui/icons-material/Brightness4';
const Home = () => {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    const bodyStyle = { backgroundColor: theme.palette.background.default };


    React.useEffect(() => {
        // Pobieranie elementu body i ustawienie stylu tła
        document.body.style.backgroundColor = theme.palette.background.default;
    }, [theme]);

    return (
        <Stack  spacing={2}>
            <Box sx={{width:'100%', display:'flex', justifyContent:'end'}}>
                <Link to={'/board'}><Button variant={"contained"}>Login</Button></Link>
            </Box>
            <Box sx={{display:'flex', justifyContent:'space-around'}}>
                <Box sx={{display:'flex', flexDirection:'column' , justifyContent:'center', alignItems:'center'}}>
                    <Box sx={{
                        color:'#ff5a00',
                        margin:'0 0 0  0',
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        flexDirection:'column'
                    }}>
                        <Typography color={'textPrimary'} variant={'h2'} >Kanban Table</Typography>
                        <Typography color={'textHard'} variant={'h4'} >by MAGI</Typography>
                        {theme.palette.mode == 'light' && (<img src={Gif} width={'500px'}/>)}
                        {!(theme.palette.mode == 'light') && (<img src={TwoPerson} width={'500px'}/>)}
                    </Box>
                </Box>
                <Box sx={{display:'flex', flexDirection:'column' , justifyContent:'center', alignItems:'center'}}>
                    <img src={Student} width={'400px'}/>
                </Box>
            </Box>
            <Box sx={{display:'flex', justifyContent:'space-around', color:'white', width:'100%'}}>
                {theme.palette.mode == 'light' && (<img src={FirmwareGif} width={'200px'}/>)}
                {!(theme.palette.mode == 'light') && (<img src={FirmwarePng} width={'200px'}/>)}
                {theme.palette.mode == 'light' && (<img src={ServerGif} width={'200px'}/>)}
                {!(theme.palette.mode == 'light') && (<img src={ServerPng} width={'200px'}/>)}
                <Box sx={{display:'flex', flexDirection:'column'}}>
                <Typography color={'textTheme'} variant={"h4"}>
                    Makes planning easier
                </Typography>
                <Typography color={'textTheme'} variant={"h4"}>
                    Helpful in learning
                </Typography>
                <Typography color={'textTheme'} variant={"h4"}>
                    Better in organization
                </Typography>
                <Typography color={'textTheme'} variant={"h4"}>
                    Makes sharing easier
                </Typography>
                </Box>
            </Box>
            <Box>
                <Typography variant={"caption"} sx={{display:'flex', justifyContent:'end'}}>
                    <a href="https://storyset.com/work">Work illustrations by Storyset</a>
                </Typography>
            </Box>
            <Button sx={{position:'absolute', bottom:'0', left:'0'}} onClick={colorMode.toggleColorMode}>
                {theme.palette.mode == 'light' && (<Typography sx={{display:'flex', justifyContent:'center', alignItems:"center" }}>Dark Mode <Brightness4Icon/></Typography>)}
                {!(theme.palette.mode == 'light') && (<Typography sx={{display:'flex', justifyContent:'center', alignItems:"center" }}>Light Mode <Brightness4Icon/></Typography>)}
            </Button>

        </Stack>
    );
}

export default Home