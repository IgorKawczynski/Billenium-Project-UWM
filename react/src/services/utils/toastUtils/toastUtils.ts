import {EnqueueSnackbar, VariantType} from 'notistack';

export const handleClickVariant = (toast: EnqueueSnackbar) => (
                                    message: string,
                                    variant: VariantType
                                ) => {
    // variant could be success, error, warning, info, or default
    toast(message, { variant });
};
