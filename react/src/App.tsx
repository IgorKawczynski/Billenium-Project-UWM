import React, {useMemo} from 'react'
import Board from "./componenets/board/board"
import Home from "./componenets/home/home";
import './App.css'
import {Route, Routes} from "react-router-dom";
import {createTheme, makeStyles, ThemeOptions, ThemeProvider, useTheme} from '@mui/material/styles';
import {lightOptions, darkOptions} from './assets/themes/BasicTheme'

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const customThemes = {
    light: createTheme(lightOptions),
    dark: createTheme(darkOptions),
};

function KabanTable() {
    const [mode, setMode] = React.useState<'light' | 'dark'>('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = React.useMemo(
        () => customThemes[mode],
        [mode],
    );
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/board" element={<Board/>}/>

                </Routes>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default KabanTable
