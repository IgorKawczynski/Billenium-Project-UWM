import React from 'react';
export default interface DataFromBackend {
        id:string
        title: string;
        creatorName: string;
        assignedUsers: { id: number; name: string }[];
        columnList: {
            id: string;
            title: string;
            cardsLimit: number;
            position: number;
            cards: {
                id: string;
                title: string;
                description: string;
                position:number;
            }[];
        }[];
}