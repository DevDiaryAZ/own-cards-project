import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, ReactNode, useState} from 'react'
import TextField from "@mui/material/TextField";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>

type SearchInputPropsType = Omit<DefaultInputPropsType, 'type'> & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: ReactNode
    spanClassName?: string
    value: string
} & {
    onDebouncedChange?: (value: string) => void
}

export const SearchInput: React.FC<SearchInputPropsType> = (
    {
        onChangeText,
        onDebouncedChange,
        value,

        ...restProps // все остальные пропсы попадут в объект restProps
    }
) => {
    const [timerId, setTimerId] = useState<number | undefined>(undefined)

    const onChangeTextCallback = (e: ChangeEvent<HTMLInputElement>) => {

        onChangeText?.(e.currentTarget.value)

        let inputText = ''

        if (e.currentTarget.value) {
            inputText = e.currentTarget.value
        }

        if (onDebouncedChange) {
            timerId && clearInterval(timerId)

            let newTimerId = setTimeout(function () {
                onDebouncedChange(inputText)
            }, 1500);
            setTimerId(Number(newTimerId))
        }
    }

    return (
        <TextField id="outlined-basic" onChange={onChangeTextCallback} value={value}     inputProps={{
            autoComplete: 'new-password',
        }}/>
    )
}
