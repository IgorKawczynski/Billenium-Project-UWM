import React, {useState, useEffect} from 'react';
import {
    Modal,
    Stack,
    Typography,
    Fade,
    Backdrop,
    Button,
    TextField,
    Box,
    InputLabel,
    FormControl,
    useTheme
} from "@mui/material";
import {modalBigStyle} from "@/assets/themes/modalStyle";
import {closeModal} from "@/services/utils/modalUtils/modalUtils";
import {ModalUserEditProfileProps} from "@/componenets/userMain/interfaces/modalUserEditProfile/modalUserEditProfile";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChangePassword from "@/componenets/userMain/changePassword/changePassword";
const ModalUserEditProfile = (props:ModalUserEditProfileProps) => {
    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);
    const [email, setEmail] = useState(props.email);
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [passwordToChange, setPasswordToChange] =useState(false);
    const theme = useTheme()

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

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    const handleRepeatPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(event.target.value);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    };

    const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    };const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
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
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                    >
                        <AccountCircleIcon
                            sx={{color:theme.palette.text.primary}}
                        />
                        <Typography
                            color={'textPrimary'}
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Edit Profile
                        </Typography>
                    </Box>
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

                            <ChangePassword
                                password={password}
                                repeatPassword={repeatPassword}
                                handlePasswordChange={handlePasswordChange}
                                handleRepeatPasswordChange={handleRepeatPasswordChange}
                                passwordToChange={passwordToChange}
                                setPasswordToChange={setPasswordToChange}
                            />

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