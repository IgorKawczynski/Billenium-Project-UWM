import {_Data} from "@/services/utils/boardUtils/DataBoard";
interface CardProps {
    id: string
    title: string
    desc: string
    index: number
    color:string
    cellId:string
    setData:_Data["setData"]
    data:_Data["data"]
}

export default CardProps