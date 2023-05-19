import React, {useState} from 'react'
import {closeModal} from "@/services/utils/modalUtils/modalUtils";
import {Backdrop, Box, Button, Fade, FormControl, InputLabel, Modal, Stack, Typography, useTheme} from "@mui/material";
import {modalStyle} from "@/assets/themes/modalStyle";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {RegisterFormProps} from "@/components/registerForm/interfaces/registerFormInterface/RegisterForm";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import {registerUser} from "@/services/utils/registerUtils/registerUtils";
import {handleClickVariant} from "@/services/utils/toastUtils/toastUtils";
import {enqueueSnackbar} from "notistack";
import {useTranslation} from "react-i18next";

const RegisterForm = (props:RegisterFormProps) => {
    const theme = useTheme()
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const { t } = useTranslation();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    };
    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    };

    const handleMailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    const handleRepeatPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(event.target.value);
    };

    const handleSentForm = () =>{
        if(password === repeatPassword){
            registerUser(
                mail,
                firstName,
                lastName,
                password,
                props.setModalLogin,
                props.setModalRegister
            )
        }else{
            handleClickVariant(enqueueSnackbar)(`Passwords must be the same` ,'error')
        }
    }

    return(
        <Modal
            style={{zIndex:'6'}}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={props.modalRegister}
            onClose={() => closeModal(props.setModalRegister)}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={props.modalRegister}>
                <Stack sx={modalStyle} spacing={2}>
                    <Box display={"flex"} alignItems={"center"} color={theme.palette.text.secondary}>
                        <HowToRegIcon/>
                        <Typography color={theme.palette.text.secondary} id="transition-modal-title" variant="h6" component="h2">
                            {t('registration')}
                        </Typography>
                    </Box>
                    <FormControl variant="outlined">
                        <InputLabel>{t('firstName')}</InputLabel>
                        <OutlinedInput
                            sx={{margin:'0 0 8px 0'}}
                            id="outlined-basic"
                            label={t('firstName')}
                            inputMode={"text"}
                            value={firstName}
                            onChange={handleFirstNameChange}
                        />
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel>{t('lastName')}</InputLabel>
                        <OutlinedInput
                            sx={{margin:'0 0 8px 0'}}
                            id="outlined-basic"
                            label={t('lastName')}
                            inputMode={"text"}
                            value={lastName}
                            onChange={handleLastNameChange}
                        />
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel>E-mail</InputLabel>
                        <OutlinedInput
                            sx={{margin:'0 0 8px 0'}}
                            id="outlined-basic"
                            label="E-mail"
                            inputMode={'email'}
                            value={mail}
                            onChange={handleMailChange}
                        />
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">{t('password')}</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            value={password}
                            onChange={handlePasswordChange}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label={t('password')}
                        />
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">{t('repeatPassword')}</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            value={repeatPassword}
                            onChange={handleRepeatPasswordChange}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label={t('repeatPassword')}
                        />
                    </FormControl>
                    <Box
                        display={"flex"}
                        justifyContent={"flex-end"}
                    >
                    </Box>
                    <Box
                        width={'100%'}
                        display={'flex'}
                        justifyContent={'space-between'}

                    >
                        <Button
                            sx={{maxHeight:'50px', maxWidth:'40%'}}
                            variant="outlined"
                            onClick={() => closeModal(props.setModalRegister)}
                        >
                            {t('cancel')}
                        </Button>
                        <Button
                            sx={{maxHeight:'50px', maxWidth:'60%'}}
                            variant="contained"
                            onClick={() => handleSentForm()}
                        >
                            {t('register')}
                        </Button>
                    </Box>
                </Stack>
            </Fade>
        </Modal>
    )
}

export default RegisterForm