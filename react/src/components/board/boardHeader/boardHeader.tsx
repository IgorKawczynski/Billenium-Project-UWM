import React from "react";
import {Box, Tooltip, Typography, useTheme} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {openModal} from "@/services/utils/modalUtils/modalUtils";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import AddColumnButton from "@/components/column/addColumnButton/addColumnButton";
import {boardHeaderProps} from "@/components/board/interfaces/boardHeaderInterface/BoardHeader";
import ColorLegend from "@/components/color/colorLegend/colorLegend";
import {useTranslation} from "react-i18next";


const BoardHeader = (props:boardHeaderProps) => {
    const theme = useTheme();
    const { t } = useTranslation();

    return(
        <Box>
            <Box display={"flex"} justifyContent={"space-between"}>
                <Box width={'250px'}>
                </Box>
                <Typography
                    variant={'h3'}
                    color={'textPrimary'}
                    style={{textAlign:"center"}}
                >
                    {props.data.title}
                    <Tooltip title={t('editBoard')} placement={"bottom"}>
                        <IconButton
                            aria-label="settingsColumn"
                            onClick={() => openModal(props.setModalEdit)}
                        >
                            <BorderColorOutlinedIcon/>
                        </IconButton>
                    </Tooltip>
                </Typography>
                <Box sx={{textAlign:'center'}} width={'250px'}>
                    <Typography
                        color={'textPrimary'}
                        variant={'h4'}
                    >
                        {t('kanbanBoard')}
                    </Typography>
                    <Typography
                        color={theme.palette.primary.main}
                        variant={'h5'}
                    >
                        by MAGI
                    </Typography>
                </Box>
            </Box>
            <Box sx={{
                display:'flex',
                justifyContent:'center',
                flexDirection:'column',
                width:'100%'
            }}>
                <AddColumnButton
                    data={props.data}
                    setData={props.setData}

                />
                <ColorLegend colors={props.data.colorList} data={props.data} setData={props.setData}/>
            </Box>
        </Box>
    )
}
export default BoardHeader