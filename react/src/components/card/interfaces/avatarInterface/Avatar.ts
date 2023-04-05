import React, {SetStateAction} from "react";

interface AvatarProps {
    userId:string
    index:number
    setUsers:React.Dispatch<SetStateAction<boolean>>
    name: string,
    lastName:string
    avatarPath:string
    avatarColor:string
    remainingAssignments:number
}
export default AvatarProps