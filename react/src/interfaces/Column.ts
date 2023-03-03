import React from "react";
import {_Data} from "./Data";
interface ColumnProps {
    id: string;
    title: string;
    cardsLimit: number;
    position:number;
    cards: {
        id: string;
        title: string;
        desc: string;
    }[];
    data:_Data["data"]
    handleDataChange:_Data["setData"]

}

export default ColumnProps