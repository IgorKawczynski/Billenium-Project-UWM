import React, {useState, useEffect} from 'react';
import {Modal, Stack, Typography, Fade, Backdrop, Button, TextField, Box, InputLabel, FormControl} from "@mui/material";
import {modalBigStyle} from "@/assets/themes/modalStyle";
import {closeModal} from "@/services/utils/modalUtils/modalUtils";
import {ModalUserEditProfileProps} from "@/componenets/userMain/interfaces/modalUserEditProfile/modalUserEditProfile";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
const ModalUserEditProfile = (props:ModalUserEditProfileProps) => {
    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);
    const [email, setEmail] = useState(props.email);
    const [password, setPassword] = useState(props.password);
    const [showPassword, setShowPassword] = React.useState(false);

    useEffect(() => {
        // kiedy zadanie zostanie załadowane, ustawiamy jego wartość w stanie
        setFirstName(props.firstName);
    }, [props.firstName]);

    useEffect(() => {
        // kiedy zadanie zostanie załadowane, ustawiamy jego wartość w stanie
        setLastName(props.lastName);
    }, [props.lastName]);
    useEffect(() => {
        // kiedy zadanie zostanie załadowane, ustawiamy jego wartość w stanie
        setEmail(props.email);
    }, [props.email]);


    useEffect(() => {
        // kiedy zadanie zostanie załadowane, ustawiamy jego wartość w stanie
        setPassword(props.password);
    }, [props.password]);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    };

    const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    };const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    return (
        <Modal
            style={{zIndex:'5'}}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={props.modalEdit}
            onClose={() => closeModal(props.setModalEdit)}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={props.modalEdit}>
                <Stack sx={modalBigStyle} spacing={2}>
                    <Typography color={'textPrimary'} id="transition-modal-title" variant="h6" component="h2">
                        Edit Profile
                    </Typography>
                    <Box
                        display={'flex'}
                    >
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            width={'50%'}
                            paddingX={1}
                        >
                            <TextField
                                sx={{margin:'0 0 8px 0'}}
                                id="outlined-basic"
                                label="Name"
                                variant="outlined"
                                value={firstName}
                                onChange={handleNameChange}
                            />
                            <TextField
                                sx={{margin:'0 0 8px 0'}}
                                id="outlined-basic"
                                label="Last Name"
                                variant="outlined"
                                value={lastName}
                                onChange={handleDescChange}
                            />
                        </Box>
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            width={'50%'}
                            paddingX={1}
                        >
                            <TextField
                                sx={{margin:'0 0 8px 0'}}
                                id="outlined-basic"
                                label="E-mail"
                                variant="outlined"
                                value={email}
                                onChange={handleEmailChange}
                            />
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    value={password}
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={handlePasswordChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ?  <Visibility /> :<VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                        </Box>
                    </Box>
                    <Box
                        width={'100%'}
                        display={'flex'}
                        justifyContent={'center'}
                    >
                        <Button
                            sx={{maxHeight:'50px', width:'100px'}}
                            variant="contained"
                        >
                            Edit
                        </Button>
                    </Box>
                </Stack>
            </Fade>
        </Modal>
    );
}

export default ModalUserEditProfile