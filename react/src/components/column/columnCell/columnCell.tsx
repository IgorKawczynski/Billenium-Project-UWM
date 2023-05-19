import React, {useState} from "react";
import {ColumnCellProps} from "@/components/column/interfaces/columnCellInterface/ColumnCell";
import Task from "@/components/card/card";
import {Droppable} from "react-beautiful-dnd";
import {Box, Tooltip, Typography, useTheme} from "@mui/material";
import AddCardButton from "@/components/card/addCardButton/addCardButton";
import StyledCardScrollbar from "@/assets/styles/styledScrollbar";
import ModalRemoveRow from "@/components/row/modalRemoveRow/modalRemoveRow";
import ModalEditRow from "@/components/row/modalEditRow/modalEditRow";
import IconButton from "@mui/material/IconButton";
import {openModal} from "@/services/utils/modalUtils/modalUtils";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {useTranslation} from "react-i18next";

const ColumnCell = (props:ColumnCellProps) =>{
    const [modalEditRow, setModalEditRow] = useState(false);
    const [modalDeleteRow, setModalDeleteRow] = React.useState(false);
    const theme = useTheme()
    const CustomScrollbar = StyledCardScrollbar()
    const { t } = useTranslation();


    return(
        <Droppable
            droppableId={props.id}
            type="task"
        >
            {(provided, snapshot) =>{
                return(
                    <Box>
                        {props.columnPosition==0 && (
                            <Box
                                marginTop={1}
                                height={'25px'}
                                display={"flex"}
                            >
                                <Box
                                    width={'100%'}
                                    borderBottom={`2px ${theme.palette.text.primary} solid`}
                                >
                                    <Typography variant={'body1'} color={theme.palette.text.primary}>
                                        {props.rowTitle.length >= 18 && (props.rowTitle.slice(0,17) + "...")}
                                        {props.rowTitle.length <= 18 && (props.rowTitle)}
                                    </Typography>
                                </Box>
                                <Tooltip title={t('editRow')} placement={"top"}>
                                    <IconButton
                                        sx={{maxHeight:'25', maxWidth:'25px'}}
                                        size={"small"}
                                        aria-label="settingsColumn"
                                        onClick={() => openModal(setModalEditRow)}
                                    >
                                        <BorderColorOutlinedIcon/>
                                    </IconButton>
                                </Tooltip>
                                {props.position != Object.keys(props.data.rowList).length-1 &&
                                    (
                                        <Tooltip title={t('deleteRow')} placement={"top"}>
                                            <IconButton
                                                        sx={{maxHeight:'25', maxWidth:'25px', color:theme.palette.primary.main}}
                                                        size={"small"}
                                                        aria-label="settingsColumn"
                                                        onClick={() => openModal(setModalDeleteRow)}
                                                    >
                                                <DeleteOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                            </Box>
                        )}
                    <Box
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        sx={{
                            backgroundColor:
                                props.cards
                                && props.cards.length > props.cardsLimit
                                && props.cardsLimit != 0
                                && props.columnPosition != 0
                                && props.columnPosition != Object.keys(props.data.columnList).length-1 ? 'rgba(255,0,8,0.51)' : '#F3F3F3'
                                && props.isDragging ? theme.palette.background.drag: theme.palette.background.cell,
                            paddingTop: '10px',
                            width: 250,
                            height:300,
                            boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)",
                            display:'flex',
                            justifyContent:'end',
                            flexDirection:'column',
                            borderRadius:'19px',
                            overflowX:'hidden',
                            marginTop:'16px',
                        }}
                    >
                        <CustomScrollbar>
                        { props.cards && props.cards.map((item:any, index:number) => {
                                return (
                                    <Task
                                        key={item.id}
                                        id={item.id}
                                        title={item.title}
                                        desc={item.description}
                                        color={item.color}
                                        assignedUsers={item.assignedUsers}
                                        subtasks={item.checkboxes}
                                        isLocked={item.isLocked}
                                        index={index}
                                        cellId={props.id}
                                        children={item.children}
                                        parentCardId={item.parentCardId}
                                        setData={props.setData}
                                        data={props.data}
                                        over={props.over}
                                        handleOnMouseOver={props.handleOnMouseOver}
                                        handleOnMouseLeave={props.handleOnMouseLeave}
                                    />
                                )
                            }
                        )}
                            {provided.placeholder}
                        </CustomScrollbar>
                        <AddCardButton
                            cellId={props.id}
                            data={props.data}
                            setData={props.setData}
                        />
                        <Box
                            sx={{bgcolor:theme.palette.primary.main}}
                            width={'100%'}
                            height={'8px'}
                        />
                        <ModalRemoveRow id={props.rowId} title={props.rowTitle} modalDelete={modalDeleteRow} setModalDelete={setModalDeleteRow} data={props.data} setData={props.setData}/>
                        <ModalEditRow id={props.rowId} title={props.rowTitle} modalEdit={modalEditRow} setModalEdit={setModalEditRow} data={props.data} setData={props.setData}/>
                    </Box>
                    </Box>
                )}}
        </Droppable>
    )
}

export default ColumnCell