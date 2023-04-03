import CircularProgressProps from '@mui/material/CircularProgress';
export interface CardPercentageCompletedProps{
    subtasks: {
        id:string
        title:string
        isChecked:boolean
    }[]
}