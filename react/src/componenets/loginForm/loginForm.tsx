import React, {useEffect, useState} from 'react'
import {closeModal} from "@/services/utils/modalUtils/modalUtils";
import {Backdrop, Box, Button, Fade, Modal, Stack, TextField, Typography, useTheme} from "@mui/material";
import {modalStyle} from "@/assets/themes/modalStyle";
import {Link} from "react-router-dom";
import {LoginFormProps} from "@/componenets/loginForm/interfaces/loginFormInterface/LoginForm";
import IconButton from '@mui/material/IconButton';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {InputLabel,FormControl} from "@mui/material";
import {openModal} from "@/services/utils/modalUtils/modalUtils";
const LoginForm = (props:LoginFormProps) => {
    const theme = useTheme()
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    return(
        <Modal
            style={{zIndex:'5'}}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={props.modalLogin}
            onClose={() => closeModal(props.setModalLogin)}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={props.modalLogin}>
                <Stack sx={modalStyle} spacing={2}>
                    <Typography
                        color={theme.palette.text.secondary}
                        id="transition-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Login
                    </Typography>
                            <TextField
                                sx={{margin:'0 0 8px 0'}}
                                id="outlined-basic"
                                label="E-mail"
                                variant="outlined"
                                value={mail}
                                onChange={handleMailChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <MailOutlineIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handlePasswordChange}
                            startAdornment={
                                <InputAdornment position="start">
                                    <LockOutlinedIcon />
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
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
                        justifyContent={"space-around"}
                    >
                        <Button
                            sx={{width:'50%'}}
                            onClick={() => openModal(props.setModalRegister)}
                        >
                            Register
                        </Button>
                        <Link style={{width:'50%'}} to={'/userMain'}>
                            <Button
                            sx={{maxHeight:'50px', width:'100%'}}
                            variant="contained"
                            >
                                Log In
                            </Button>
                        </Link>
                    </Box>
                </Stack>
            </Fade>
        </Modal>
    )
}

export default LoginForm