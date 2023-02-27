import _board from "./Board";
interface _task{
    key: string
    id: string
    index: number
    content: string
    desc: string
    columnId:string
    columns:_board["columns"]
    setColumns:_board["setColumns"]
}

export default _task