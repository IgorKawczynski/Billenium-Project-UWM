import DataFromBackend from "../interfaces/DataFromBackend";
import {_Data} from "../interfaces/DataBoard";
import { v4 as uuidv4 } from 'uuid';

export default function transformData(inputData: DataFromBackend): _Data["data"] {
    return {
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
            columns[uuidv4()] = {
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

