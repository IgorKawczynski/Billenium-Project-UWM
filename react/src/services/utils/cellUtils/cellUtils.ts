import {_Data} from "@/services/utils/boardUtils/DataBoard";

interface CellDataIndex {
    desiredCellIndex: number;
    desiredColumnIndex: number;
}

interface CellDataId {
    desiredCellId: string;
    desiredColumnId: string;
}

export const findCellByIndex = (id:string, data:_Data["data"]): CellDataIndex =>{
    let desiredCellIndex = 0
    let desiredColumnIndex =0
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

export const findCellById = (id:string, data:_Data["data"]): CellDataId => {
    let desiredCellId = ""
    let desiredColumnId = ""
    data.columnList.some((column ) => {
        return column.cells.some((cell) => {
            if (cell.id === id) {
                desiredCellId = cell.id;
                desiredColumnId = column.id;
                return true;
            }
        });
    });
    return {desiredCellId, desiredColumnId}
}