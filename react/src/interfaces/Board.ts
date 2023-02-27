import React from "react";

interface _board {
    children: React.ReactNode;
    columns: {
        [key: string]: {
            title: string;
            items: {
                id: string;
                content: string;
                desc:string;
            }[];
            index:number;
        };
    };
    setColumns: React.Dispatch<React.SetStateAction<{
        [key: string]: {
            title: string;
            items: {
                id: string;
                content: string;
                desc:string;
            }[];
            index: number;
        };
    }>>;
    items: {
        id: string;
        content: string;
        desc:string;
        }[];
    setItems: React.Dispatch<React.SetStateAction<{
        id: string;
        content: string;
        desc:string;

    }[]>>;
}
export default _board