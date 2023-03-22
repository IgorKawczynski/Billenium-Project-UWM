import {_Data} from "@/services/utils/boardUtils/DataBoard";


export const findCell = (id:string, data:_Data["data"]) =>{
    let desiredCellIndex:number, desiredColumnIndex:number
    data.columnList.some((column , columnIndex) => {
        return column.cells.some((cell,cellIndex) => {
            if (cell.id === id) {
                desiredCellIndex = cellIndex;
                desiredColumnIndex = columnIndex;
                return true;
            }
        });
    });
    return {desiredCellIndex, desiredColumnIndex}
}