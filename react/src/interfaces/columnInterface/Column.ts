import {_Data, Card} from "@/services/utils/boardUtils/DataBoard";
interface ColumnProps {
    key:string
    id: string;
    title: string;
    cardsLimit: number;
    position:number;
    cards: Card[];
    data:_Data["data"];
    setData:_Data["setData"];

    isDragging:boolean
}

export default ColumnProps