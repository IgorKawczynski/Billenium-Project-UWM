import {_Data, assignedUser, Card} from "@/services/utils/boardUtils/DataBoard";

interface CardProps {
    id: string
    title: string
    desc: string
    index: number
    color:string
    assignedUsers:assignedUser[]
    subtasks:{
        id:string
        title:string
        isChecked:boolean
    }[]
    isLocked:boolean
    children:Card[]
    cellId:string
    setData:_Data["setData"]
    data:_Data["data"]
}

export default CardProps