import axios from 'axios'
import {Dispatch} from 'redux'
import {setAuthErrorAC} from "../../store/authReducer";

export type ErrorType = {
    error: string
}

export const handleError = (e: unknown, dispatch: Dispatch) => {
    if (axios.isAxiosError<ErrorType>(e)) {
        const error = e.response?.data ? e.response.data.error : e.message

        dispatch(setAuthErrorAC(error))
    } else {
        dispatch(setAuthErrorAC('Some error'))
    }
}