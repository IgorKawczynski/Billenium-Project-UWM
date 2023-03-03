import {_Data} from "../../../../../../../interfaces/Data";
interface CardProps {
    id: string
    title: string
    desc: string
    index: number
    columnId:string
    handleDataChange:_Data["setData"]
    data:_Data["data"]
}

export default CardProps