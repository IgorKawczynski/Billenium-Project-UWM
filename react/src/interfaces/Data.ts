import React from 'react';
export interface _Data {
    data: {
        id: number;
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
                desc: string;
            }[];
        }>;
    };
    setData: React.Dispatch<
        React.SetStateAction<{
            id: number;
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
                    desc: string;
                }[];
            }>;
        }>
    >;
}