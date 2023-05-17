import React from 'react';

export interface _Data {
    data: {
        id:string
        title: string;
        creatorId:string
        creatorName: string;
        assignedUsers:assignedUser[]
        columnList:Column[];

        rowList: Row[];

        colorList:Color[];
        wipLimit:string
    };
    setData: React.Dispatch<
        React.SetStateAction<{
            id: string
            title: string;
            creatorId:string
            creatorName: string;
            assignedUsers: assignedUser[]

            columnList: Column[];

            rowList: Row[];

            colorList: Color[];
            wipLimit:string
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

    parentCardId:string
    assignedUsers:assignedUser[]
    checkboxes:{
        id:number
        title:string
        isChecked:boolean
    }[]
    isLocked:boolean
    children:Card[]
}
export interface assignedUser{
    id: string;
    firstName: string;
    lastName: string;
    avatarPath:string;
    avatarColor:string;
    remainingAssignments:number
}
export interface activeUser{
    id: string;
    firstName: string;
    lastName: string;
    email:string;
    avatarPath:string;
    avatarColor:string
}

