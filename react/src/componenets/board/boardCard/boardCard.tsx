import React from "react";
import {Grid, Box, useTheme, Typography} from "@mui/material";
import {ColorModeContext} from "@/App";
import {Link} from "react-router-dom";
import {BoardCardProps} from "@/componenets/board/interfaces/boardCard/boardCard";


const BoardCard = (props:BoardCardProps) => {
    const theme = useTheme()
    const colorMode = React.useContext(ColorModeContext);
    React.useEffect(() => {
        // Pobieranie elementu body i ustawienie stylu tła
        document.body.style.backgroundColor = theme.palette.background.default;
    }, [theme]);
    return(
            <Grid
                item
                xs={2}
                padding={2}
                minWidth={'250px'}
            >
                <Link to={`/board/${props.id}`} style={{textDecoration:'none'}}>
                <Box
                    borderLeft={`20px solid ${theme.palette.primary.main}`}
                    boxShadow={'0px 4px 4px rgba(0, 0, 0, 0.25)'}
                    height={'140px'}
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={"end"}
                    bgcolor={theme.palette.background.cell}
                    padding={1}
                    borderRadius={'10px 0 0 10px'}
                >
                    <Box height={'80%'}>
                        <Typography variant={"h5"} color={theme.palette.text.primary}>
                            Kanban
                        </Typography>
                        <Typography variant={"subtitle1"} color={theme.palette.text.primary}>
                            Creator: Maciek Makowski
                        </Typography>
                    </Box>
                    <Box height={'20%'}>

                    </Box>

                </Box>
                </Link>
            </Grid>

    )
}
export default BoardCard
