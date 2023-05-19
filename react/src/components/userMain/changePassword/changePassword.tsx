import React from "react";
import {Button, FormControl, InputLabel} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {ChangePasswordProps} from "@/components/userMain/interfaces/changePassword/changePassword";
import {closeModal, openModal} from "@/services/utils/modalUtils/modalUtils";
import {useTranslation} from "react-i18next";

const ChangePassword = (props:ChangePasswordProps) =>{
    const [showPassword, setShowPassword] = React.useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = React.useState(false);
    const { t } = useTranslation()
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowRepeatPassword = () => setShowRepeatPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseDownRepeatPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return(
        <>
        {props.passwordToChange && (
            <>
                <FormControl variant="outlined">
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
                                    onMouseDown={handleMouseDownRepeatPassword}
                                    edge="end"
                                >
                                    {showRepeatPassword ?  <Visibility /> :<VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label={t('repeatPassword')}
                    />
                </FormControl>
                <Button
                    onClick={() => closeModal(props.setPasswordToChange)}
                >
                    {t('cancel')}
                </Button>
            </>

            )}
            {!props.passwordToChange && (
                <Button
                    onClick={() => openModal(props.setPasswordToChange)}
                >
                    {t('edit')}
                </Button>
            )}
        </>

    )
}

export default ChangePassword

