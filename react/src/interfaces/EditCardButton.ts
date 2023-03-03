import {_Data} from "./Data";
interface EditCardButtonProps {

    id: string;
    columnId:string;
    title:string;
    desc:string;
    data:_Data["data"]
    handleDataChange:_Data["setData"]
}

export default EditCardButtonProps