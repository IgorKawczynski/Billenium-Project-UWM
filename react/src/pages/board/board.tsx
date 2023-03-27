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
import BoardMenu from "@/componenets/menus/boardMenu/menu";
import {useNavigate, useParams} from "react-router-dom";
const Board = () => {
    const theme = useTheme();
    const {boardId} = useParams()
    const colorMode = React.useContext(ColorModeContext);
    const [data, setData] = useState<_Data['data']> (loadDefaultData);
    const [modalEdit, setModalEdit] = useState(false);
    const [users, setUsers] = useState(false)
    const [isAssigned, setIsAssigned] = useState(false)
    const navigate = useNavigate()

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
        if(boardId){
            fetchData(
                setData,
                boardId,
                isAssigned,
                setIsAssigned,
                navigate);
        }
    }, []);




    return (
        <>
            {sessionStorage.getItem('sessionId') &&
                 isAssigned && (
        <Stack spacing={2} direction={"row"} minHeight={'100%'}>
            <BoardMenu setUsers={setUsers}/>
            <Stack spacing={2} width={calculatedWidth}>
                <BoardHeader data={data} setModalEdit={setModalEdit} setData={setData}/>
                <BoardContent users={users} setUsers={setUsers} data={data} setData={setData}/>
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
                )}
        </>
    );
}

export default Board