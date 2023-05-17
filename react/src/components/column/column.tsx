import React, {useState} from 'react'
import {Draggable} from 'react-beautiful-dnd';
import ColumnProps from '@/components/column/interfaces/columnInterface/Column'
import ModalEditColumn from "@/components/column/modalEditColumn/modalEditColumn";
import ModalRemoveColumn from "@/components/column/modalRemoveColumn/modalRemoveColumn";
import {Box, Stack, useTheme} from "@mui/material";
import ColumnHeader from "@/components/column/columnHeader/columnHeader";
import ColumnCell from "@/components/column/columnCell/columnCell";

const Column = (props:ColumnProps) => {
    const theme = useTheme()
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = React.useState(false);
    return(
        <Stack
            alignItems={"center"}
            direction={"column"}
            spacing={2}
        >
            <Draggable
                draggableId={props.id}
                index={props.position}
                key={props.id}
            >
                {provided => (
                    <Box
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                        <ColumnHeader
                            title={props.title}
                            cardsLimit={props.cardsLimit}
                            position={props.position}
                            data={props.data}
                            provided={provided}
                            setModalEdit={setModalEdit}
                            setModalDelete={setModalDelete}
                        />
                {Object.values(props.data.rowList).map((row) => (
                    <Box key={row.id}>
                        {props.position!=0 && (
                        <Box
                            marginTop={1}
                            height={'25px'}
                        >
                        </Box>
                    )}
                        {Object.values(props.cells).map((cell) => (
                                    cell.position == row.position && (
                                    <ColumnCell
                                        key={cell.id}
                                        id={cell.id}
                                        rowId={row.id}
                                        rowTitle={row.title}
                                        columnPosition={props.position}
                                        cardsLimit={props.cardsLimit}
                                        position={cell.position}
                                        cards={cell.cards}
                                        data={props.data}
                                        setData={props.setData}
                                        isDragging={props.isDragging}
                                        over={props.over}
                                        handleOnMouseOver={props.handleOnMouseOver}
                                        handleOnMouseLeave={props.handleOnMouseLeave}
                                    />
                                    )
                                ))}
                    </Box>
                ))}

        </Box>
      )}
            </Draggable>

            <ModalEditColumn
                id={props.id}
                title={props.title}
                cardsLimit={props.cardsLimit}
                position={props.position}
                modalEdit={modalEdit}
                setModalEdit={setModalEdit}
                data={props.data}
                setData={props.setData}
            />

            <ModalRemoveColumn
                id={props.id}
                title={props.title}
                setModalDelete={setModalDelete}
                modalDelete={modalDelete}
                data={props.data}
                setData={props.setData}
            />
        </Stack>
    )
}


export default Column
