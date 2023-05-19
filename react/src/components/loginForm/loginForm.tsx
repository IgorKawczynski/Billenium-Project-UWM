import React, {useState} from 'react'
import {closeModal, openModal} from "@/services/utils/modalUtils/modalUtils";
import {
    Backdrop,
    Box,
    Button,
    Fade,
    FormControl,
    InputLabel,
    Modal,
    Stack,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import {modalStyle} from "@/assets/themes/modalStyle";
import {useNavigate} from "react-router-dom";
import {LoginFormProps} from "@/components/loginForm/interfaces/loginFormInterface/LoginForm";
import IconButton from '@mui/material/IconButton';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {loginUser} from "@/services/utils/loginUtils/loginUtils";
import {useTranslation} from "react-i18next";

const LoginForm = (props:LoginFormProps) => {
    const theme = useTheme()
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = React.useState(false);
    const navigate = useNavigate()
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
                        {t('login')}
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
                        <InputLabel htmlFor="outlined-adornment-password">{t('password')}</InputLabel>
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
                            {t('register')}
                        </Button>
                            <Button
                            sx={{maxHeight:'50px', width:'50%'}}
                            variant="contained"
                            onClick={() => loginUser(mail,password, navigate)}
                            >
                                {t('login')}
                            </Button>
                    </Box>
                </Stack>
            </Fade>
        </Modal>
    )
}

export default LoginForm