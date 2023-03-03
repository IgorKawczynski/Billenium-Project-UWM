import BoardProps from "./Board";
interface ModalCardButtonProps {
    columns: BoardProps['columns'];
    setColumns: BoardProps['setColumns'];
    id: string;
    columnId:string;
    content:string;
    desc:string;

    handleClose:any;
}

export default ModalCardButtonProps