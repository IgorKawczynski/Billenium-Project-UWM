import React, {useEffect, useState} from 'react'
import Box from '@mui/material/Box'
import TableChartIcon from '@mui/icons-material/TableChart'
import Typography from "@mui/material/Typography";
import '../../App.css'
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import OnePerson from '../../resources/imgs/org_1pers.png'
import TwoPerson from '../../resources/imgs/org_2pers.png'
import ThreePerson from '../../resources/imgs/org_3pers.png'
import Student from '../../resources/imgs/student.png'
import Frame from '../../resources/imgs/Frame1.png'
import Gif from '../../resources/gifs/gifTwo.gif'
import Firmware from '../../resources/gifs/Firmware.gif'
import Server from '../../resources/gifs/Server.gif'
import {Link} from "react-router-dom";
const Home = () => {


    return (
        <Stack  spacing={8}>
            <Box sx={{width:'100%', display:'flex', justifyContent:'end'}}>
                <Link to={'/board'}><Button sx={{background:'#ff5a00'}} variant={"contained"}>Login</Button></Link>
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
                        <Typography variant={'h2'} color={'#455A64'}>Kanban Table</Typography>
                        <Typography variant={'h4'} >by MAGI</Typography>
                        <img src={Gif} width={'500px'}/>
                    </Box>
                </Box>
                <Box sx={{display:'flex', flexDirection:'column' , justifyContent:'center', alignItems:'center'}}>
                    <img src={Student} width={'400px'}/>
                </Box>
            </Box>
            <Box sx={{display:'flex', justifyContent:'space-around', color:'white', width:'100%'}}>
                        <img src={Firmware} width={'200px'}/>
                        <img src={Server} width={'250px'}/>
                <Box sx={{display:'flex', flexDirection:'column'}}>
                <Typography variant={"h4"}>
                    Makes planning easier
                </Typography>
                <Typography variant={"h4"}>
                    Helpful in learning
                </Typography>
                <Typography variant={"h4"}>
                    Better in organization
                </Typography>
                <Typography variant={"h4"}>
                    Makes sharing easier
                </Typography>
                </Box>
            </Box>
            <Typography variant={"caption"} sx={{display:'flex', justifyContent:'end'}}>
                <a href="https://storyset.com/work">Work illustrations by Storyset</a>
            </Typography>

        </Stack>
    );
}

export default Home