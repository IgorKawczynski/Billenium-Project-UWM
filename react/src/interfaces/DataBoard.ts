import React from 'react';
export interface _Data {
    data: {
        id:string
        title: string;
        creatorName: string;
        assignedUsers: {
            id: string;
            name: string;
        }[];
        columnList: Record<string, {
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
        }>;
    };
    setData: React.Dispatch<
        React.SetStateAction<{
            id:string
            title: string;
            creatorName: string;
            assignedUsers: { id: string; name: string }[];
            columnList: Record<string, {
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
            }>;
        }>
    >;
}