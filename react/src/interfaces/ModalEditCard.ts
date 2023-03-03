import {_Data} from "./Data";
interface ModalEditCardProps {

    id: string;
    columnId:string;
    title:string;
    desc:string;
    modalEditClose: () => void
    modalEdit:boolean
    data:_Data["data"]
    handleDataChange:_Data["setData"]
}

export default ModalEditCardProps