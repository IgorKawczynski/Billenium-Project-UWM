import React from "react";
import _board from "./Board";
interface _column {
    id: string;
    title: string;
    items: {
        id: string;
        content: string;
        desc:string;
    }[];
    index: number;
    columns: _board['columns'];
    setColumns: _board['setColumns'];

}

export default _column