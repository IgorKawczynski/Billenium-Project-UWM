import React from "react";
import {Box, CircularProgress, Tooltip, Typography, LinearProgress} from "@mui/material";
import {
    CardPercentageCompletedProps
} from "@/components/card/interfaces/cardPercentageCompleted/cardPercentageCompleted";
export const CardPercentageCompleted = (props:CardPercentageCompletedProps) => {


    return (
        <Tooltip title={"Progress"}>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress variant="determinate" value={props.subtasks} />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography
                        variant="caption"
                        component="div"
                        color="text.secondary"
                    >
                        {`${Math.round(props.subtasks)}%`}
                    </Typography>
                </Box>
            </Box>
        </Tooltip>
    );
}


export const CardPercentageCompletedLinear = (props:CardPercentageCompletedProps) => {


    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" value={props.subtasks} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">
                    {`${Math.round(props.subtasks)}%`}
                </Typography>
            </Box>
        </Box>
    );
}
