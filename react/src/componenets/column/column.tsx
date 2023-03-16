import React, {useState} from 'react'
import {Draggable} from 'react-beautiful-dnd';
import ColumnProps from '@/interfaces/columnInterface/Column'
import AddCardButton from "@/componenets/addCardButton/addCardButton";
import ModalEditColumn from "@/componenets/modalEditColumn/modalEditColumn";
import ModalRemoveColumn from "@/componenets/modalRemoveColumn/modalRemoveColumn";
import {Box, Stack} from "@mui/material";
import ColumnHeader from "@/componenets/columnHeader/columnHeader";
import ColumnCell from "@/componenets/columnCell/columnCell";

const Column = (props:ColumnProps) => {
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
            <Box
                style={{margin:8}}
            >
                <AddCardButton
                    columnId={props.id}
                    data={props.data}
                    setData={props.setData}
                />
                <ColumnCell
                    id={props.id}
                    cards={props.cards}
                    cardsLimit={props.cardsLimit}
                    position={props.position}
                    data={props.data}
                    setData={props.setData}
                    isDragging={props.isDragging}
                />
            </Box>
        </Box>
      )}
            </Draggable>
            <ModalEditColumn
                id={props.id}
                title={props.title}
                cardsLimit={props.cardsLimit}
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
