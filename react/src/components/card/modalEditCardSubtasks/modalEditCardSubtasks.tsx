import React from "react";
import {Box, Stack, Checkbox, FormControlLabel, Typography, useTheme} from "@mui/material";
import ModalEditCardSubtasksItem from "@/components/card/modalEditCardSubtasksItem/modalEditCardSubtasksItem";
import {ModalEditCardSubtasksProps} from "@/components/card/interfaces/modalEditCardSubtasks/modalEditCardSubtasks";
import {CardPercentageCompletedLinear} from "@/components/card/cardPercentageCompleted/cardPercentageCompleted";

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
                <ModalEditCardSubtasksItem cardId={props.cardId} isChecked={false} title={"tytuł taska"}/>
                <ModalEditCardSubtasksItem cardId={props.cardId} isChecked={true} title={"tytuł taska"}/>
                <ModalEditCardSubtasksItem cardId={props.cardId} isChecked={true} title={"tytuł taska"}/>
                <ModalEditCardSubtasksItem cardId={props.cardId} isChecked={true} title={"tytuł taska"}/>
                <ModalEditCardSubtasksItem cardId={props.cardId} isChecked={true} title={"tytuł taska"}/>
                <ModalEditCardSubtasksItem cardId={props.cardId} isChecked={true} title={"tytuł taska"}/>
                <ModalEditCardSubtasksItem cardId={props.cardId} isChecked={true} title={"tytuł taska"}/>

            </Stack>

        </Box>
    )
}

export default ModalEditCardSubtasks
