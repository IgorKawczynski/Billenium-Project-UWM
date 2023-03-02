import React from "react";
import _board from "./Board";
interface _column {
    id: string;
    title: string;
    cardsLimit: number;
    position:number;
    cards: {
        id: string;
        title: string;
        desc: string;
    }[];
    removeColumn:any;
    editColumn:any;

}

export default _column