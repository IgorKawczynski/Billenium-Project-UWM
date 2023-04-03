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
    }[]
    subtasks:{
        id:string
        title:string
        isChecked:boolean
    }[]
    data:_Data["data"]
    setData:_Data["setData"]
}

export default EditCardButtonProps