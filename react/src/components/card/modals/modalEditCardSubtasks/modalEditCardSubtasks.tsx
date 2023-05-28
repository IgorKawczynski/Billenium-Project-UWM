import React from "react";
import {Box, Stack, Typography, useTheme} from "@mui/material";
import ModalEditCardSubtasksItem from "@/components/card/modals/modalEditCardSubtasksItem/modalEditCardSubtasksItem";
import {ModalEditCardSubtasksProps} from "@/components/card/interfaces/modalEditCardSubtasks/modalEditCardSubtasks";
import {CardPercentageCompletedLinear} from "@/components/card/cardPercentageCompleted/cardPercentageCompleted";
import ModalEditCardSubtasksAddButton
    from "@/components/card/modals/modalEditCardSubtasksAddButton/modalEditCardSubtasksAddButton";
import {useTranslation} from "react-i18next";

const ModalEditCardSubtasks = (props:ModalEditCardSubtasksProps) =>{
    const theme = useTheme()
    const { t } = useTranslation();

    return(
        <>
            {props.subtasks.length > 0 && (
                <Box
                    minHeight={'40px'}
                    aria-label={'checkboxField'}
                    display={"flex"}
                    flexDirection={"column"}
                    textAlign={"left"}
                >
                    <Box>
                        <Typography variant={"subtitle1"} sx={{color:theme.palette.text.primary}}>
                            {t('subtasks')}
                        </Typography>
                        <CardPercentageCompletedLinear subtasks={props.subtasks}/>
                    </Box>
                    <Stack
                        padding={1}
                        spacing={1}
                        direction={"column"}
                        maxHeight={'230px'}
                        overflow={"auto"}
                    >
                        <ModalEditCardSubtasksAddButton cardId={props.cardId} data={props.data} setData={props.setData}/>
                        {props.subtasks.map(subtask => {
                            return(
                                <ModalEditCardSubtasksItem
                                    key={subtask.id}
                                    cardId={props.cardId}
                                    cardTitle={props.cardTitle}
                                    isChecked={subtask.isChecked}
                                    title={subtask.title}
                                    id={subtask.id}
                                    data={props.data}
                                    setData={props.setData}
                                    window={props.window}
                                />
                            )
                        })}

                    </Stack>

                </Box>
            )}
            {props.subtasks.length == 0 && (
                <Box
                    minHeight={'40px'}
                    aria-label={'checkboxField'}
                    display={"flex"}
                    flexDirection={"column"}
                    textAlign={"left"}
                >
                    <Box>
                        <Typography variant={"subtitle1"} sx={{color:theme.palette.text.primary}}>
                            {t('subtasks')}
                        </Typography>
                    </Box>
                        <Stack
                            padding={1}
                            spacing={1}
                            direction={"column"}
                            maxHeight={'200px'}
                            overflow={"auto"}
                        >
                            <ModalEditCardSubtasksAddButton cardId={props.cardId} data={props.data} setData={props.setData}/>
                        </Stack>
                    </Box>
            )}

        </>
    )
}

export default ModalEditCardSubtasks
