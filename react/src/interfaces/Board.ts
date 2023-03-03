import React from "react";
import {_Data} from "./Data";
interface BoardProps {
    children: React.ReactNode
    data: _Data["data"]
    handleDataChange:_Data["setData"]

}

export default BoardProps