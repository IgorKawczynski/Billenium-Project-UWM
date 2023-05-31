import {_Data} from "@/services/utils/boardUtils/DataBoard";

interface EditCardButtonProps {

    id: string;
    cellId:string;
    title:string;
    desc:string;
    assignedUsers:{
        id: string;
        firstName: string;
        lastName: string;
        avatarPath:string;
        avatarColor: string;
        remainingAssignments: number;
    }[]
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