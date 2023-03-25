import React, {SetStateAction} from "react";

export interface BoardUsersProps{
    users:boolean
    setUsers: React.Dispatch<SetStateAction<boolean>>
}