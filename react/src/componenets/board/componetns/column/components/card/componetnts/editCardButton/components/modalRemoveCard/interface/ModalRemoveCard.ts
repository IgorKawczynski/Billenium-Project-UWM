import {_Data} from "../../../../../../../../../../../interfaces/DataBoard";
interface ModalRemoveCardProps {

    id: string
    title:string
    columnId:string
    modalDeleteClose: () => void
    modalDelete:boolean
    data:_Data["data"]
    handleDataChange:_Data["setData"]
}

export default ModalRemoveCardProps