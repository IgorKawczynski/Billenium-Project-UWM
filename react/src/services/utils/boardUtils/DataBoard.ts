import React from 'react';
export interface _Data {
    data: {
        id:string
        title: string;
        creatorName: string;
        assignedUsers: {
            id: string;
            firstName: string;
            lastName:string;
        }[];
        columnList:Column[];

        rowList: Row[];

        colorList:Color[];
    };
    setData: React.Dispatch<
        React.SetStateAction<{
            id: string
            title: string;
            creatorName: string;
            assignedUsers: {
                id: string;
                firstName: string;
                lastName: string;
            }[];

            columnList: Column[];

            rowList: Row[];

            colorList: Color[];
        }>>;
}

export interface Column{
    id: string;
    title: string;
    cardsLimit: number;
    position: number;
    cells:Cell[]
}

export interface Color {
    id:string;
    title:string;
    value:string;
}


export interface Row{
    id: string;
    title: string;
    position: number;
}


export interface Cell{
    id: string;
    position: number;
    cards:Card[];
}


export interface Card{
    id: string;
    title: string;
    description: string;
    position:number;
    color:string;
};

