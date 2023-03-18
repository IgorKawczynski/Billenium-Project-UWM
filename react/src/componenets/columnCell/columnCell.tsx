import React from "react";
import Box from "@mui/material/Box"
import {ColumnCellProps} from "@/interfaces/columnCellInterface/ColumnCell";
import Task from "@/componenets/card/card";
import {Droppable} from "react-beautiful-dnd";
import {useTheme} from "@mui/material";
import AddCardButton from "@/componenets/addCardButton/addCardButton";
import {styled} from "@mui/material/styles";


const ColumnCell = (props:ColumnCellProps) =>{
    const theme = useTheme()
    const CustomScrollbar = styled('div')({
        height:'100%',
        overflowX:'hidden',
        overflowY: 'auto',
        paddingRight:'8px',
        paddingLeft:'8px',
        '&::-webkit-scrollbar': {
            width: '4px',
            height: '2px',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.text.primary,
            borderRadius: '3px',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
        },
        '&::-moz-scrollbar': {
            width: '4px',
            height: '2px',
        },
        '&::-moz-scrollbar-thumb': {
            backgroundColor: theme.palette.text.primary,
            borderRadius: '3px',
        },
        '&::-moz-scrollbar-track': {
            backgroundColor: 'transparent',
        },
        '&::-ms-scrollbar': {
            width: '4px',
            height: '2px',
        },
        '&::-ms-scrollbar-thumb': {
            backgroundColor: theme.palette.text.primary,
            borderRadius: '3px',
        },
        '&::-ms-scrollbar-track': {
            backgroundColor: 'transparent',
        },
        'scrollbar-color': `${theme.palette.text.primary} transparent`,
        'scrollbar-width': 'thin',
    });
    return(
        <Droppable
            droppableId={props.id}
            type="task"
        >
            {(provided, snapshot) =>{
                return(
                    <Box
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        sx={{
                            backgroundColor:
                                props.cards
                                && props.cards.length > props.cardsLimit
                                && props.cardsLimit != 0
                                && props.position != 0
                                && props.position != Object.keys(props.data.columnList).length-1 ? 'rgba(255,0,8,0.51)' : '#F3F3F3'
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
                                        index={index}
                                        columnId={props.id}
                                        setData={props.setData}
                                        data={props.data}
                                    />
                                )
                            }
                        )}
                            {provided.placeholder}
                        </CustomScrollbar>
                        <AddCardButton
                            columnId={props.id}
                            data={props.data}
                            setData={props.setData}
                        />
                        <Box
                            sx={{bgcolor:theme.palette.primary.main}}
                            width={'100%'}
                            height={'8px'}
                        />
                    </Box>
                )}}
        </Droppable>
    )
}

export default ColumnCell