import {_Data, Card} from "@/services/utils/boardUtils/DataBoard";

interface CardProps {
    id: string
    title: string
    desc: string
    index: number
    color:string
    assignedUsers:Card["assignedUsers"]
    cellId:string
    setData:_Data["setData"]
    data:_Data["data"]
}

export default CardProps