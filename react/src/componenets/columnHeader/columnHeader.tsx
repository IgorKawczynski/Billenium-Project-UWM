import React from "react";
import {Grid, useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {openModal} from "@/services/utils/modalUtils/modalUtils";
import {columnHeaderProps} from "@/interfaces/columnHeaderInterface/ColumnHeader";

const ColumnHeader = (props:columnHeaderProps) =>{
    const theme = useTheme();

    return(
        <Grid
            style={{
                width:'100%',
                display:"flex",
                justifyContent:"space-around"
            }}
        >
            <Grid
                {...props.provided.dragHandleProps}
                style={{
                    display:"flex",
                    alignItems:"center"
                }}
            >

                <Typography
                    color={'textPrimary'}
                    variant={'h5'}
                >
                    {props.title}
                </Typography>

                { props.cardsLimit != 0
                    && props.position != 0
                    && props.position !== Object.keys(props.data.columnList).length-1 &&
                    (<Typography color={'textSecondary'} sx={{
                        marginLeft:'8px',
                        height:'80%',
                        display:'flex',
                        flexDirection:'column',
                        justifyContent:'end'}}
                                 variant={'caption'}>
                        <Box></Box>
                        Limit: {props.cardsLimit}
                    </Typography>)}
            </Grid>
            <Grid>
                <IconButton
                    aria-label="settingsColumn"
                    onClick={() => openModal(props.setModalEdit)}
                >
                    <BorderColorOutlinedIcon />
                </IconButton>
                {props.position !== 0 && props.position !== Object.keys(props.data.columnList).length-1 && (
                    <IconButton
                        aria-label="delete"
                        onClick={() => openModal(props.setModalDelete)}
                        sx={{color:theme.palette.primary.main}}
                    >
                        <DeleteOutlinedIcon />
                    </IconButton>

                )}
            </Grid>
        </Grid>
    )
}

export default ColumnHeader