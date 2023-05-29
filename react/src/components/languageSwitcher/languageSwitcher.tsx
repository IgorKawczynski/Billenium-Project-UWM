import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from "@/components/languageSwitcher/i18n";
import {Avatar, Tooltip} from "@mui/material";
import english from '@/assets/imgs/lng/english.png'
import polish from '@/assets/imgs/lng/polish.png';
import {Select, MenuItem} from "@mui/material";

function LanguageSwitcher() {
    const { t } = useTranslation();

    const handleChangeLanguage = (event:any) => {
        const selectedLanguage = event.target.value;
        i18n.changeLanguage(selectedLanguage);
        localStorage.setItem('lng', event.target.value)
    };

    return (
        <Tooltip title={t('selectLanguage')} placement={"right"}>
            <Select
                sx={{border:'none'}}
                IconComponent={() => null}
                onChange={handleChangeLanguage}
                value={localStorage.getItem('lng') || 'en'}
             >
                <MenuItem value="en">
                    <Tooltip title={'English'} placement={'right'}>
                        <Avatar sx={{maxHeight:'20px', maxWidth:'20px'}} src={english}/>
                    </Tooltip>
                </MenuItem>
                <MenuItem value="pl">
                    <Tooltip title={'Polski'} placement={'right'}>
                        <Avatar sx={{maxHeight:'20px', maxWidth:'20px'}}  src={polish}/>
                    </Tooltip>
                </MenuItem>
            </Select>
        </Tooltip>
    );
}

export default LanguageSwitcher;