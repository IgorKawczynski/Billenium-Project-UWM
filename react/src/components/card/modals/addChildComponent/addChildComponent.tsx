import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from "@mui/material/Button";
import {MenuItem} from "@mui/material";
import {Card} from '@/services/utils/boardUtils/DataBoard'
import axios from "axios";
import { urlDomain } from "@/services/actions/boardService";
import {addChild} from "@/services/utils/cardUtils/cardUtils";
import {AddChildComponentProps} from "@/components/card/interfaces/addChildComponent/AddChildComponent";
import {useTranslation} from "react-i18next";

const AddChildComponent = (props:AddChildComponentProps) => {
    const [child, setChild] = useState('');
    const [childs, setChilds] = useState<Card[]>([]);
    const [childExists, setChildExists] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${urlDomain}/api/cards/without-parent/${props.boardId}?parentId=${props.cardId}`);
                setChilds(response.data);
                setChildExists(true);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [props.cardId]);

    const handleChange = (event: SelectChangeEvent) => {
        setChild(event.target.value);
    };

    if (!childExists) {
        return null; // Możesz zwrócić null lub dowolny inny komponent ładowania
    }

    return (
        <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
                <InputLabel>{t('addChild')}</InputLabel>
                <Select
                    value={child}
                    label={t('addChild')}
                    onChange={handleChange}
                >
                    {childs.length != 0 && childs.map((child) => (
                        <MenuItem key={child.id} value={child.id}>{child.title}</MenuItem>
                    ))}
                    {childs.length == 0 && (
                        <MenuItem key={0} value={''}>{t('noChildrenAvailable')}</MenuItem>
                    )}
                </Select>
                <Button
                    sx={{ marginTop: 1 }}
                    onClick={() => addChild(props.cardId, child, props.data, props.setData)}
                >
                    {t('addChild')}
                </Button>
            </FormControl>
        </Box>
    );
};

export default AddChildComponent;