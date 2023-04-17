import React, {ChangeEvent} from 'react'
import s from './TextInput.module.css'
import TextField from "@mui/material/TextField";

type PropsType = {
    labelTitle: string
    error?: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const TextInput = (props: PropsType) => {

    return (
        <div className={s.registration_input}>
            {/* MUI text field */}
            <TextField id="standard-basic"
                       label="labelTitle"
                       variant="standard"
                       helperText={props.error}

            />
        </div>
    )
}