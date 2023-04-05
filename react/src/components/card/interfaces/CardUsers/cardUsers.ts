import {DroppableProvided} from "react-beautiful-dnd";
import {assignedUser} from "@/services/utils/boardUtils/DataBoard";

export interface CardUsersProps{
    id:string
    assignedUsers:assignedUser[]
    providedDrop:DroppableProvided
}