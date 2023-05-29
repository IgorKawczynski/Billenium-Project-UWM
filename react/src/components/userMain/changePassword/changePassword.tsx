import React from "react";
import {Button, FormControl, InputLabel, Box} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {ChangePasswordProps} from "@/components/userMain/interfaces/changePassword/changePassword";
import {closeModal, openModal} from "@/services/utils/modalUtils/modalUtils";
import {useTranslation} from "react-i18next";
import {changePassword} from "@/services/utils/UserUtils/userMainUtils";
import {handleClickVariant} from "@/services/utils/toastUtils/toastUtils";
import {enqueueSnackbar} from "notistack";

const ChangePassword = (props:ChangePasswordProps) =>{
    const [showOldPassword, setShowOldPassword] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = React.useState(false);
    const { t } = useTranslation()
    const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowRepeatPassword = () => setShowRepeatPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const checkPasswords = () => {
        if(props.password === props.repeatPassword){
            changePassword(
                t,
                props.userId,
                props.oldPassword,
                props.password,
                props.setPasswordToChange,
                props.setOldPassword,
                props.setPassword,
                props.setRepeatPassword
            );
        }else{
            handleClickVariant(enqueueSnackbar)(t('differentPasswords'),'error')
        }
    }

    return(
        <>
        {props.passwordToChange && (
            <>
                <FormControl variant="outlined" sx={{marginTop:1}}>
                    <InputLabel htmlFor="outlined-adornment-password">{t('oldPassword')}</InputLabel>
                    <OutlinedInput
                        value={props.oldPassword}
                        id="outlined-adornment-password"
                        type={showOldPassword ? 'text' : 'password'}
                        onChange={props.handleOldPasswordChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowOldPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showOldPassword ?  <Visibility /> :<VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Old Password"
                    />
                </FormControl>
                <FormControl variant="outlined" sx={{marginTop:1}}>
                    <InputLabel htmlFor="outlined-adornment-password">{t('password')}</InputLabel>
                    <OutlinedInput
                        value={props.password}
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={props.handlePasswordChange}
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
                <FormControl variant="outlined" sx={{marginTop:1}}>
                    <InputLabel htmlFor="outlined-adornment-password">{t('repeatPassword')}</InputLabel>
                    <OutlinedInput
                        value={props.repeatPassword}
                        id="outlined-adornment-password"
                        type={showRepeatPassword ? 'text' : 'password'}
                        onChange={props.handleRepeatPasswordChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowRepeatPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showRepeatPassword ?  <Visibility /> :<VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label={t('repeatPassword')}
                    />
                </FormControl>
                <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                >
                    <Button
                        sx={{marginTop:1}}
                        onClick={() => closeModal(props.setPasswordToChange)}
                        variant={'outlined'}
                    >
                        {t('cancel')}
                    </Button>
                    <Button
                        sx={{marginTop:1}}
                        onClick={() => checkPasswords()}
                        variant={'contained'}
                    >
                        {t('edit')}
                    </Button>
                </Box>
            </>

            )}
            {!props.passwordToChange && (
                <Button
                    onClick={() => openModal(props.setPasswordToChange)}
                >
                    {t('changePassword')}
                </Button>
            )}
        </>

    )
}

export default ChangePassword

