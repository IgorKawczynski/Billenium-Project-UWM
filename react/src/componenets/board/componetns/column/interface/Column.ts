import React from "react";
import {_Data} from "../../../../../interfaces/DataBoard";
interface ColumnProps {
    key:string
    id: string;
    title: string;
    cardsLimit: number;
    position:number;
    cards: {
        id: string;
        title: string;
        description: string;
    }[];
    data:_Data["data"]
    handleDataChange:_Data["setData"]

    isDragging:boolean
}

export default ColumnProps