import React from "react";
import {Box, Tooltip, Typography, useTheme} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {openModal} from "@/services/utils/modalUtils/modalUtils";
import {columnHeaderProps} from "@/components/column/interfaces/columnHeaderInterface/ColumnHeader";
import AllInclusiveOutlinedIcon from '@mui/icons-material/AllInclusiveOutlined';
import {useTranslation} from "react-i18next";

const ColumnHeader = (props:columnHeaderProps) =>{
    const theme = useTheme();
    const { t } = useTranslation();

    return(
        <Box
            sx={{
                width:'100%',
                minHeight:'50px',
                maxWidth:'250px',
                display:"flex",
                justifyContent:"space-between",
                flexDirection:'column',
                borderRadius:'8px',
                overflow:"hidden",
                boxShadow:`0px 4px 4px ${theme.palette.text.shadow}`,
                bgcolor:theme.palette.background.cell
            }}
        >
            <Box
            sx={{bgcolor:theme.palette.primary.main}}
            width={'100%'}
            height={'4px'}
            >

            </Box>
            <Box sx={{
                    alignItems:'center',
                    height:'46px',
                    width:'100%',
                    display:"flex",
                    justifyContent:"space-between"
            }}
            >
            <Box
                {...props.provided.dragHandleProps}
                sx={{
                    display:"flex",
                    justifyContent:'space-between',
                    alignItems:"center",
                    marginLeft:'8px'
                }}
            >
                { props.cardsLimit != 0
                    && props.position != 0
                    && props.position !== Object.keys(props.data.columnList).length-1 &&
                    (<Box
                        border={`1px ${theme.palette.text.primary} solid`}
                        minWidth={20}
                        minHeight={20}
                        borderRadius={100}
                        textAlign={"center"}
                        marginRight={'8px'}
                    >
                        <Typography color={'textSecondary'}
                                    variant={'body2'}
                        >
                        {props.cardsLimit}
                    </Typography></Box>)}
                {   props.position == 0 &&
                    (<Box
                        border={`1px ${theme.palette.text.primary} solid`}
                        width={20}
                        height={20}
                        borderRadius={100}
                        textAlign={"center"}
                        marginRight={'8px'}
                    >
                        <AllInclusiveOutlinedIcon sx={{color:theme.palette.text.primary}} fontSize={"inherit"}/>
                    </Box>)}

                { props.cardsLimit == 0 &&
                    props.position != 0&&
                    props.position != Object.keys(props.data.columnList).length-1 &&
                    (<Box
                        border={`1px ${theme.palette.text.primary} solid`}
                        width={20}
                        height={20}
                        borderRadius={100}
                        textAlign={"center"}
                        marginRight={'8px'}
                    >
                        <AllInclusiveOutlinedIcon sx={{color:theme.palette.text.primary}} fontSize={"inherit"}/>
                    </Box>)}

                { props.position == Object.keys(props.data.columnList).length-1 &&
                    (<Box
                        border={`1px ${theme.palette.text.primary} solid`}
                        width={20}
                        height={20}
                        borderRadius={100}
                        textAlign={"center"}
                        marginRight={'8px'}
                    >
                        <AllInclusiveOutlinedIcon sx={{color:theme.palette.text.primary}} fontSize={"inherit"}/>
                    </Box>)}

                <Typography
                    color={'textPrimary'}
                    variant={'h6'}
                >
                    {props.title.length > 10 && (props.title.slice(0,7) + "...")}
                    {props.title.length <= 10 && (props.title)}
                </Typography>

            </Box>
            <Box
            marginRight={'8px'}
            >
                <Tooltip title={t('editColumn')} placement={"top"}>
                    <IconButton
                        aria-label="settingsColumn"
                        size={"small"}
                        onClick={() => openModal(props.setModalEdit)}
                    >
                        <BorderColorOutlinedIcon />
                    </IconButton>
                </Tooltip>
                {props.position !== 0 && props.position !== Object.keys(props.data.columnList).length-1 && (
                    <Tooltip title={t('deleteColumn')} placement={"top"}>
                        <IconButton
                            aria-label="delete"
                            size={"small"}
                            onClick={() => openModal(props.setModalDelete)}
                            sx={{color:theme.palette.primary.main}}
                        >
                            <DeleteOutlinedIcon />
                        </IconButton>
                    </Tooltip>

                )}
            </Box>
            </Box>
        </Box>
    )
}

export default ColumnHeader