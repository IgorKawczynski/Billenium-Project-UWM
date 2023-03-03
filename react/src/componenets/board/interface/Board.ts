import React from "react";
import {_Data} from "../../../interfaces/DataBoard";
interface BoardProps {
    children: React.ReactNode
    data: _Data["data"]
    handleDataChange:_Data["setData"]

}

export default BoardProps