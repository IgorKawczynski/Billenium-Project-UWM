import React, {SetStateAction} from "react";

export interface UserMenuProps{
    modalEdit:boolean,
    setModalEdit: React.Dispatch<SetStateAction<boolean>>
}