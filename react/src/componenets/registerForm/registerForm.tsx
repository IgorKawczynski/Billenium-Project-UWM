import React, {useState} from 'react'
import {closeModal} from "@/services/utils/modalUtils/modalUtils";
import {Backdrop, Box, Button, Fade, Icon, Modal, Stack, TextField, Typography, useTheme} from "@mui/material";
import {modalStyle} from "@/assets/themes/modalStyle";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {InputLabel,FormControl} from "@mui/material";
import {RegisterFormProps} from "@/componenets/registerForm/interfaces/registerFormInterface/RegisterForm";
import HowToRegIcon from '@mui/icons-material/HowToReg';
const RegisterForm = (props:RegisterFormProps) => {
    const theme = useTheme()
    const [FirstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);

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
                            Registration
                        </Typography>
                    </Box>
                    <FormControl variant="outlined">
                        <InputLabel>First Name</InputLabel>
                        <OutlinedInput
                            sx={{margin:'0 0 8px 0'}}
                            id="outlined-basic"
                            label="First Name"
                            inputMode={"text"}
                            value={FirstName}
                            onChange={handleFirstNameChange}
                        />
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel>Last Name</InputLabel>
                        <OutlinedInput
                            sx={{margin:'0 0 8px 0'}}
                            id="outlined-basic"
                            label="Last Name"
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
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
                            label="Password"
                        />
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Repeat password</InputLabel>
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
                            label="Repeat password"
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
                            sx={{maxHeight:'50px', width:'100px'}}
                            variant="outlined"
                            onClick={() => closeModal(props.setModalRegister)}
                        >
                            Back
                        </Button>
                        <Button
                            sx={{maxHeight:'50px', width:'100px'}}
                            variant="contained"
                        >
                                Register
                        </Button>
                    </Box>
                </Stack>
            </Fade>
        </Modal>
    )
}

export default RegisterForm