import React, {useState} from 'react'
import Box from '@mui/material/Box'
import Typography from "@mui/material/Typography";
import '@/assets/styles/home.css'
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Student from '@/assets/imgs/student.png'
import StudentDark from '@/assets/imgs/darkmode_lern.png'
import Gif from '@/assets/gifs/gifTwo.gif'
import FirmwareGif from '@/assets/gifs/Firmware.gif'
import ServerGif from '@/assets/gifs/Server.gif'
import TwoPerson from '@/assets/imgs/org_2pers.png'
import ServerPng from '@/assets/imgs/Server.png'
import FirmwarePng from '@/assets/imgs/Firmware.png'
import {useTheme} from "@mui/material/styles";
import {ColorModeContext} from '@/App';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import {openModal} from "@/services/utils/modalUtils/modalUtils";
import LoginForm from "@/components/loginForm/loginForm";
import RegisterForm from "@/components/registerForm/registerForm";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import LanguageSwitcher from "@/components/languageSwitcher/languageSwitcher";

const Home = () => {
    const [modalLogin, setModalLogin] = useState(false);
    const [modalRegister, setModalRegister] = useState(false);
    const theme = useTheme();
    const { t } = useTranslation();
    const colorMode = React.useContext(ColorModeContext);
    const bodyStyle = { backgroundColor: theme.palette.background.default };
    const navigate = useNavigate();

    React.useEffect(() => {
        // Pobieranie elementu body i ustawienie stylu tła
        document.body.style.backgroundColor = theme.palette.background.default;
    }, [theme]);

    return (
        <Stack  spacing={1} sx={{overflow:'hidden'}}>
            <Box
                sx={{
                    width:'100%',
                    display:'flex',
                    justifyContent:'end'
                }}
            >
                <Box
                    padding={2}
                >
                    {sessionStorage.getItem('sessionId') &&
                        sessionStorage.getItem('userId') &&
                        (
                        <Button
                            variant={"outlined"}
                            onClick={() => navigate(`/userMain/${sessionStorage.getItem('userId')}`)}
                        >
                            {t('myPanel')}
                        </Button>
                    )}
                    {!sessionStorage.getItem('sessionId') &&(
                        <Typography variant={"body1"}>
                            <Button
                                onClick={() => openModal(setModalLogin)}
                                variant={"contained"}>
                                {t('login')}
                            </Button>
                        </Typography>
                    )}

                </Box>
                <Box width={'50px'}>
                    <LanguageSwitcher/>
                </Box>
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
                        <Typography color={'textPrimary'} variant={'h2'} >{t('kanbanBoard')}</Typography>
                        <Typography color={'textHard'} variant={'h4'} >by MAGI</Typography>
                        {theme.palette.mode == 'light' && (<img alt={'Main page image'} src={Gif} width={'500px'}/>)}
                        {!(theme.palette.mode == 'light') && (<img alt={'Main page image'} src={TwoPerson} width={'500px'}/>)}
                    </Box>
                </Box>
                <Box sx={{display:'flex', flexDirection:'column' , justifyContent:'center', alignItems:'center'}}>
                    {theme.palette.mode == 'light' && (<img alt={'Main page image'} src={Student} width={'400px'}/>)}
                    {!(theme.palette.mode == 'light') && (<img alt={'Main page image'} src={StudentDark} width={'400px'}/>)}
                </Box>
            </Box>
            <Box sx={{display:'flex', justifyContent:'space-around', color:'white', width:'100%'}}>
                {theme.palette.mode == 'light' && (<img alt={'Main page image'} src={FirmwareGif} width={'200px'}/>)}
                {!(theme.palette.mode == 'light') && (<img alt={'Main page image'} src={FirmwarePng} width={'200px'}/>)}
                {theme.palette.mode == 'light' && (<img alt={'Main page image'} src={ServerGif} width={'200px'}/>)}
                {!(theme.palette.mode == 'light') && (<img alt={'Main page image'} src={ServerPng} width={'200px'}/>)}
                <Box sx={{display:'flex', flexDirection:'column'}}>
                <Typography color={'textTheme'} variant={"h4"}>
                    {t('MakesPlanningEasier')}
                </Typography>
                <Typography color={'textTheme'} variant={"h4"}>
                    {t('HelpfulInLearning')}
                </Typography>
                <Typography color={'textTheme'} variant={"h4"}>
                    {t('BetterInOrganization')}
                </Typography>
                <Typography color={'textTheme'} variant={"h4"}>
                    {t('MakesSharingEasier')}
                </Typography>
                </Box>
            </Box>
            <Box>
                <Typography variant={"caption"} sx={{position:'absolute', bottom:'0', right:'0',display:'flex', justifyContent:'end'}}>
                    <a href="https://storyset.com/work">Work illustrations by Storyset</a>
                </Typography>
            </Box>
            <Button sx={{position:'absolute', bottom:'0', left:'0'}} onClick={colorMode.toggleColorMode}>
                {theme.palette.mode == 'light' && (<Typography sx={{display:'flex', justifyContent:'center', alignItems:"center" }}>{t('DarkMode')} <Brightness4Icon/></Typography>)}
                {!(theme.palette.mode == 'light') && (<Typography sx={{display:'flex', justifyContent:'center', alignItems:"center" }}>{t('LightMode')} <Brightness4Icon/></Typography>)}
            </Button>
            <LoginForm
                modalLogin={modalLogin}
                setModalLogin={setModalLogin}
                modalRegister={modalRegister}
                setModalRegister={setModalRegister}
            />
            <RegisterForm
                setModalLogin={setModalLogin}
                modalRegister={modalRegister}
                setModalRegister={setModalRegister}
            />
        </Stack>
    );
}

export default Home