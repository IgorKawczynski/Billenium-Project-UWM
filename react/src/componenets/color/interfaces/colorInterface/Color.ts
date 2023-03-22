import {_Data} from "@/services/utils/boardUtils/DataBoard";

export interface ColorProps {
    id: string
    color: string
    title: string
}

export interface setColorProps {
    id: string
    color: string
    title: string
    data:_Data['data']
    setData:_Data["setData"]
}