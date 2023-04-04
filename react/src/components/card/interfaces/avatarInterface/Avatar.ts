import React, {SetStateAction} from "react";

interface AvatarProps {
    userId:string
    setUsers:React.Dispatch<SetStateAction<boolean>>
    name: string,
    lastName:string
    avatarPath:string
    avatarColor:string
}
export default AvatarProps