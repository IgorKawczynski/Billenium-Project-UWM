import React, {SetStateAction} from "react";

interface _avatar{
    isDragging:React.Dispatch<SetStateAction<boolean>>
    setUsers:React.Dispatch<SetStateAction<boolean>>
    name: string,
    lastName:string
}
export default _avatar