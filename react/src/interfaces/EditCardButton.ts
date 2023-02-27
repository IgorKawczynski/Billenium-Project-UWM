import _board from "./Board";
interface EditCardButtonEditProps {
    columns: _board['columns'];
    setColumns: _board['setColumns'];
    id: string;
    columnId:string;
    content:string;
    desc:string;
}

export default EditCardButtonEditProps