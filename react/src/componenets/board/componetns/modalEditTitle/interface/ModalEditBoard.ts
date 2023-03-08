import {_Data} from "../../../../../interfaces/DataBoard";
interface ModalEditBoardProps {
    id:string
    title:string
    modalEdit:boolean
    modalEditClose:() => void
    data:_Data["data"]
    handleDataChange:_Data["setData"]
}

export default ModalEditBoardProps