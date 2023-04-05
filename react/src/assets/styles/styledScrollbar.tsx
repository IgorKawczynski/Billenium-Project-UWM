import {styled} from "@mui/material/styles";
import {useTheme} from "@mui/material";

const StyledCardScrollbar = () => {
    const theme = useTheme()

    return styled('div')({
        height: '100%',
        overflowX: 'hidden',
        overflowY: 'auto',
        paddingRight: '8px',
        paddingLeft: '8px',
        '&::-webkit-scrollbar': {
            width: '4px',
            height: '2px',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.text.primary,
            borderRadius: '3px',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
        },
        '&::-moz-scrollbar': {
            width: '4px',
            height: '2px',
        },
        '&::-moz-scrollbar-thumb': {
            backgroundColor: theme.palette.text.primary,
            borderRadius: '3px',
        },
        '&::-moz-scrollbar-track': {
            backgroundColor: 'transparent',
        },
        '&::-ms-scrollbar': {
            width: '4px',
            height: '2px',
        },
        '&::-ms-scrollbar-thumb': {
            backgroundColor: theme.palette.text.primary,
            borderRadius: '3px',
        },
        '&::-ms-scrollbar-track': {
            backgroundColor: 'transparent',
        },
        'scrollbarColor': `${theme.palette.text.primary} transparent`,
        'scrollbarWidth': 'thin',
    })
}

export default StyledCardScrollbar