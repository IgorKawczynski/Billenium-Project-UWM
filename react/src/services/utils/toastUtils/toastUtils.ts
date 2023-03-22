import React from 'react'
import {VariantType} from 'notistack';
import {EnqueueSnackbar} from "notistack";
export const handleClickVariant = (toast: EnqueueSnackbar) => (
                                    message: string,
                                    variant: VariantType
                                ) => {
    // variant could be success, error, warning, info, or default
    toast(message, { variant });
};
