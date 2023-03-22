import React, {SetStateAction} from "react";

export const closeModal = (state:React.Dispatch<SetStateAction<boolean>>) => {
    state(false);
};

export const openModal = (state:React.Dispatch<SetStateAction<boolean>>) => {
    state(true);
};