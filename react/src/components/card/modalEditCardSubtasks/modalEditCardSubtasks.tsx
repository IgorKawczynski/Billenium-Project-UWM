import React from "react";
import {Box, Stack, Checkbox, FormControlLabel, Typography, useTheme} from "@mui/material";
import ModalEditCardSubtasksItem from "@/components/card/modalEditCardSubtasksItem/modalEditCardSubtasksItem";
import {ModalEditCardSubtasksProps} from "@/components/card/interfaces/modalEditCardSubtasks/modalEditCardSubtasks";
import {CardPercentageCompletedLinear} from "@/components/card/cardPercentageCompleted/cardPercentageCompleted";
import ModalEditCardSubtasksAddButton
    from "@/components/card/modalEditCardSubtasksAddButton/modalEditCardSubtasksAddButton";

const ModalEditCardSubtasks = (props:ModalEditCardSubtasksProps) =>{
    const theme = useTheme()

    return(
        <Box
            minHeight={'40px'}
            aria-label={'checkboxField'}
            display={"flex"}
            flexDirection={"column"}
            textAlign={"left"}
        >
            <Box>
                <Typography variant={"subtitle1"} sx={{color:theme.palette.text.primary}}>
                    Subtasks
                </Typography>
                <CardPercentageCompletedLinear subtasks={props.subtasks}/>
            </Box>
            <Stack
                padding={1}
                spacing={1}
                direction={"column"}
                maxHeight={'200px'}
                overflow={"auto"}
            >
                <ModalEditCardSubtasksAddButton cardId={props.cardId} data={props.data} setData={props.setData}/>
                {props.subtasks.map(subtask => {
                    return(
                    <ModalEditCardSubtasksItem
                        key={subtask.id}
                        cardId={props.cardId}
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
    )
}

export default ModalEditCardSubtasks
