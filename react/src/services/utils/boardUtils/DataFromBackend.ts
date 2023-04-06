import {assignedUser, Card} from "@/services/utils/boardUtils/DataBoard";

export default interface DataFromBackend {
        id:string
        title: string;
        creatorName: string;
        assignedUsers: assignedUser[];
        columnList: {
            id: string;
            title: string;
            cardsLimit: number;
            position: number;
            cards: Card[];
        }[];
}

export interface columnFromBackend{
    id: string;
    title: string;
    cardsLimit: number;
    position: number;
    cards: Card[];
}