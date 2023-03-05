import DataFromBackend from "../interfaces/DataFromBackend";
import {_Data} from "../interfaces/DataBoard";
import { v4 as uuidv4 } from 'uuid';

export default function transformData(inputData: DataFromBackend): _Data["data"] {
    return {
        id: inputData.id,
        title: inputData.title,
        creatorName: inputData.creatorName,
        assignedUsers: inputData.assignedUsers.map((user) => ({
            id: user.id.toString(),
            name: user.name,
        })),
        columnList: inputData.columnList.map((column) => ({
            ...column,
            id: column.id,
            cards: column.cards.map((card) => ({...card})),
        })).reduce((columns, column) => {
            columns[column.id] = {
                id: column.id,
                title: column.title,
                cardsLimit: column.cardsLimit,
                position: column.position,
                cards: column.cards,
            };
            return columns;
        }, {} as Record<string, {
            id: string;
            title: string;
            cardsLimit: number;
            position: number;
            cards: {
                id: string;
                title: string;
                description: string;
            }[];
        }>),
    };
}

export function transformColumns(inputColumns: DataFromBackend['columnList']):  _Data["data"]["columnList"]{
    return Object.fromEntries(
        Object.entries(inputColumns).map(([id, column]) => [
            [column.id],
            {
                id:column.id,
                title: column.title,
                cardsLimit: column.cardsLimit,
                position: column.position,
                cards: column.cards.map((card) => ({
                    id: card.id,
                    title: card.title,
                    description: card.description,
                })),
            },
        ])
    );
}

