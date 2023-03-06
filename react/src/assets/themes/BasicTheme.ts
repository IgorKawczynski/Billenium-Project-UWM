import { ThemeOptions } from '@mui/material/styles';


declare module '@mui/material/styles' {
    interface TypeBackground {
        drag: string;
    }
    interface TypeText {
        hard: string;
        theme:string;
    }
}

export const lightOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#ff5a00',
        },
        secondary: {
            main: '#bf360c',
        },
        info: {
            main: '#ffd600',
        },
        text: {
            primary: '#455a64',
            hard:'#ff5a00',
            theme:'#ffffff',
        },
        background: {
            drag: 'rgba(255,90,0,0.26)',
        },
        divider: 'rgba(208,208,208,0.95)',
    },
};
export const darkOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#ff5a00',
        },
        secondary: {
            main: '#ff0025',
        },
        info: {
            main: '#ffd600',
        },
        text: {
            primary: '#dedede',
            hard:'#ff5a00',
            theme:'#ff0025',
        },
        background: {
            drag: 'rgba(255,90,0,0.26)',
        },
        divider: 'rgba(208,208,208,0.95)',
    },
};

