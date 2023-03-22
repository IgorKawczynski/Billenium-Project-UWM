import {_Data, Color} from "@/services/utils/boardUtils/DataBoard";

export interface ColorListProps {
    colors: Color[]
    data:_Data['data']
    setData:_Data['setData']
}