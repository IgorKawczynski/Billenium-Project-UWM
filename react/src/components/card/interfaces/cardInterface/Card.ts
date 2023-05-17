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
    parentCardId:string
    setData:_Data["setData"]
    data:_Data["data"]

    over:string
    handleOnMouseOver: (parentId:string) => void
    handleOnMouseLeave: () => void
}

export default CardProps