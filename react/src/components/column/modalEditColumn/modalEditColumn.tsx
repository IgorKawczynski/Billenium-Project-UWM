import React, {useEffect, useState} from 'react'
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import {Grid} from "@mui/material";
import ModalEditColumnProps from "@/components/column/interfaces/modalEditColumnInterface/ModalEditColumn";
import Stack from "@mui/material/Stack";
import {modalStyle} from "@/assets/themes/modalStyle";
import {closeModal} from "@/services/utils/modalUtils/modalUtils";
import {editColumn} from "@/services/utils/columnUtils/columnUtils";
import {useTranslation} from "react-i18next";

const ModalEditColumn = (props:ModalEditColumnProps) => {
    const [title, setTitle] = useState(props.title);
    const [limit, setLimit] = useState(props.cardsLimit);
    const [checkLimit, setCheckLimit] = useState(false);
    const [lockedLimit, setLockedLimit] = useState(false)
    const { t } = useTranslation();
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };
    const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        if(value > 0){
            setLimit(value);
        }
    };

    useEffect(() => {
        if(props.position == 0 || props.position == Object.keys(props.data.columnList).length-1){
            setCheckLimit(true)
        }
    })

    const handleCheckLimitChange = () => {
        setCheckLimit((prevState) => !prevState);
    };

    useEffect(() => {
        if(props.position == 0 || props.position == Object.keys(props.data.columnList).length-1){
            setLockedLimit(true)
        }
        if(props.position != 0 && props.position != Object.keys(props.data.columnList).length-1){
            setLockedLimit(false)
        }
    })

    return(
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={props.modalEdit}
                onClose={() => closeModal(props.setModalEdit)}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={props.modalEdit}>
                    <Stack
                        sx={modalStyle}
                        spacing={2}
                        direction={'column'}
                    >
                        <Typography color={'textPrimary'} id="transition-modal-title" variant="h6" component="h2">
                            {t('editingColumn')}: {props.title}
                        </Typography>
                                <TextField
                                    sx={{margin:'0 0 8px 0'}}
                                    id="outlined-basic"
                                    label={t('name')}
                                    variant="outlined"
                                    value={title}
                                    onChange={handleNameChange}
                                />
                                <TextField
                                    disabled={checkLimit}
                                    sx={{margin:'0 0 8px 8px'}}
                                    id="outlined-basic"
                                    label={t('limit')}
                                    variant="outlined"

                                    type="number"
                                    value={limit}
                                    onChange={handleLimitChange}
                                />
                                <Grid sx={{display:'flex',
                                    width:'100%',
                                    justifyContent:'center',
                                    flexDirection:'column',
                                    textAlign:'center'
                                    }}
                                >
                                    <Typography color={'textPrimary'}>
                                        {t('unlimited')}
                                    </Typography>
                                    <div>
                                    <Checkbox
                                        disabled={lockedLimit}
                                        checked={checkLimit}
                                        onChange={handleCheckLimitChange}
                                    />
                                    </div>
                                </Grid>
                        <Button
                            sx={{maxHeight:'50px'}}
                            onClick={() => editColumn(title,
                                                    limit,
                                                    props.id,
                                                    checkLimit,
                                                    props.data,
                                                    props.setModalEdit,
                                                    props.setData
                                                )}
                            variant="contained"
                        >
                            {t('edit')}
                        </Button>
                    </Stack>
                </Fade>
            </Modal>
    )
}

export default ModalEditColumn
