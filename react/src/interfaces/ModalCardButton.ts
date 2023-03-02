import _board from "./Board";
interface ModalCardButtonProps {
    columns: _board['columns'];
    setColumns: _board['setColumns'];
    id: string;
    columnId:string;
    content:string;
    desc:string;

    handleClose:any;
}

export default ModalCardButtonProps