import {_Data, assignedUser} from "@/services/utils/boardUtils/DataBoard";

interface EditCardButtonProps {

    id: string;
    cellId:string;
    title:string;
    desc:string;
    assignedUsers:assignedUser[]
    subtasks:{
        id:string
        title:string
        isChecked:boolean
    }[]
    isLocked:boolean
    data:_Data["data"]
    setData:_Data["setData"]
}

export default EditCardButtonProps