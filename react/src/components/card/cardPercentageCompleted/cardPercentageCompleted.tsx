import React from "react";
import {Box, CircularProgress, LinearProgress, Tooltip, Typography} from "@mui/material";
import {
    CardPercentageCompletedProps
} from "@/components/card/interfaces/cardPercentageCompleted/cardPercentageCompleted";
import {useTranslation} from "react-i18next";

function calculateCompleted(subtasks:CardPercentageCompletedProps["subtasks"]):number {
    let completed = 0
    if (subtasks.length > 0) {
        subtasks.map((task) => {
            if (task.isChecked) {
                completed++
            }
        })
        completed = completed / subtasks.length * 100
    }
    return completed
}

export const CardPercentageCompleted = (props:CardPercentageCompletedProps) => {
    const { t } = useTranslation();

    // @ts-ignore
    return (
        <>
            {props.subtasks && (
                <Tooltip title={t('progress')}>
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                        <CircularProgress variant="determinate" value={calculateCompleted(props.subtasks)} />
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
                                letterSpacing={0.1}
                            >
                                {`${Math.round(calculateCompleted(props.subtasks))}%`}
                            </Typography>
                        </Box>
                    </Box>
                </Tooltip>

                )}
        </>
    );
}


export const CardPercentageCompletedLinear = (props:CardPercentageCompletedProps) => {


    return (
        <>
            {props.subtasks && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: '100%', mr: 1 }}>
                        <LinearProgress variant="determinate" value={calculateCompleted(props.subtasks)} />
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                        <Typography variant="body2" color="text.secondary">
                            {`${Math.round(calculateCompleted(props.subtasks))}%`}
                        </Typography>
                    </Box>
                </Box>
            )}
        </>
    );
}
