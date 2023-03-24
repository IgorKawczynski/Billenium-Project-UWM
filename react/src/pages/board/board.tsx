import React, {useEffect, useState} from 'react'
import {_Data} from "@/services/utils/boardUtils/DataBoard";
import {loadDefaultData} from "@/services/actions/boardService";
import {useTheme, Stack, Box} from "@mui/material";
import {ColorModeContext} from "@/App";
import '@/assets/styles/board.css'
import ModalEditBoard from "@/componenets/board/modalEditBoard/modalEditBoard";
import {fetchData} from "@/services/actions/boardService";
import BoardHeader from "@/componenets/board/boardHeader/boardHeader";
import BoardContent from "@/componenets/board/boardContent/boardContent";
import AddRowButton from "@/componenets/row/addRowButton/addRowButton";
import BoardMenu from "@/componenets/Menus/boardMenu/menu";
import {useLocation, useParams} from "react-router-dom";

const Board = () => {
    const theme = useTheme();
    const {id} = useParams()
    const colorMode = React.useContext(ColorModeContext);
    const [data, setData] = useState<_Data['data']> (loadDefaultData);
    const [modalEdit, setModalEdit] = React.useState(false);
    const calculatedWidth = `calc(100% - 80px)`;
    useEffect(() => {
        document.body.style.backgroundImage = 'none';
        return () => {
            document.body.style.backgroundImage = '';
        };
    }, []);

    React.useEffect(() => {
        // Pobieranie elementu body i ustawienie stylu tła
        document.body.style.backgroundColor = theme.palette.background.default;
    }, [theme]);
    useEffect(() => {
        if(id){
            fetchData(setData, id);
        }
    }, []);


    return (
        <Stack spacing={2} direction={"row"} minHeight={'100%'}>
            <BoardMenu/>
            <Stack spacing={2} width={calculatedWidth}>
                <BoardHeader data={data} setModalEdit={setModalEdit} setData={setData}/>
                <BoardContent data={data} setData={setData}/>
                <AddRowButton data={data} setData={setData}/>
                <ModalEditBoard
                    id={data.id}
                    title={data.title}
                    modalEdit={modalEdit}
                    setModalEdit={setModalEdit}
                    data={data}
                    setData={setData}
                />
            </Stack>
        </Stack>
    );
}

export default Board