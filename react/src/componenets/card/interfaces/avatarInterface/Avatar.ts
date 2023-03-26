import React, {SetStateAction} from "react";

interface AvatarProps {
    userId:string
    setUsers:React.Dispatch<SetStateAction<boolean>>
    name: string,
    lastName:string
}
export default AvatarProps