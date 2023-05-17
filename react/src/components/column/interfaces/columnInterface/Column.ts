import {_Data, Cell} from "@/services/utils/boardUtils/DataBoard";

interface ColumnProps {
    key:string
    id: string;
    title: string;
    cardsLimit: number;
    position:number;
    cells: Cell[];
    data:_Data["data"];
    setData:_Data["setData"];

    isDragging:boolean
    over:string
    handleOnMouseOver: (parentId:string) => void
    handleOnMouseLeave: () => void
}

export default ColumnProps