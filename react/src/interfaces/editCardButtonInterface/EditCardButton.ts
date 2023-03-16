import {_Data} from "@/services/utils/boardUtils/DataBoard";
interface EditCardButtonProps {

    id: string;
    columnId:string;
    title:string;
    desc:string;
    data:_Data["data"]
    setData:_Data["setData"]
}

export default EditCardButtonProps