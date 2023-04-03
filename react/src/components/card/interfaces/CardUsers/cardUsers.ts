import {DroppableProvided} from "react-beautiful-dnd";

export interface CardUsersProps{
    id:string
    assignedUsers:{
        id: string;
        firstName: string;
        lastName: string;
        avatarPath:string;
    }[]
    providedDrop:DroppableProvided
}