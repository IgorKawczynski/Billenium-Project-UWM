import React from "react";
import {Box, Stack, Grid} from '@mui/material'
import BoardMenu from "@/componenets/menu/menu";
import BoardCard from "@/componenets/board/boardCard/boardCard";

const UserMain = () => {


    return(
        <Stack
            spacing={2}
            direction={'row'}
            width={'100%'}
        >
                <BoardMenu/>
            <Grid
                xs={12}
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

        </Stack>

    )

}
export default UserMain