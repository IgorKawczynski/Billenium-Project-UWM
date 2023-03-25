import React, {useState} from "react";
import {Box, Stack, Grid} from '@mui/material'
import UserMenu from "@/componenets/menus/userMenu/menu";
import BoardCard from "@/componenets/board/boardCard/boardCard";
import ModalUserEditProfile from "@/componenets/userMain/modalUserEditProfile/modalUserEditProfile";

const UserMain = () => {
    const [modalEdit, setModalEdit] = useState(false);

    return(
        <Stack
            spacing={2}
            direction={'row'}
            width={'100%'}
        >
                <UserMenu
                    modalEdit={modalEdit}
                    setModalEdit={setModalEdit}
                />
            <Grid
                container
            >
                <BoardCard id={'1201'}/>
                <BoardCard id={'1201'}/>
                <BoardCard id={'1201'}/>
                <BoardCard id={'1201'}/>
                <BoardCard id={'1201'}/>
                <BoardCard id={'1201'}/>
                <BoardCard id={'1201'}/>


            </Grid>
            <ModalUserEditProfile
                firstName={"Maciek"}
                lastName={"Makowski"}
                email={"maciek@wp.pl"}
                phoneNumber={123456789}
                password={"MaciekKosk"}
                modalEdit={modalEdit}
                setModalEdit={setModalEdit}
            />
        </Stack>

    )

}
export default UserMain