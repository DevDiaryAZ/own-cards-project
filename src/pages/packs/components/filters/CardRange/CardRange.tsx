import Box from '@mui/material/Box'
import {Slider} from "@mui/material"
import s from './CardRange.module.css'

type PropsType = {
    max: number
    min: number
    value: number[]
    onChange: (event: Event, newValue: number | number[]) => void
}

export const CardRange = ({max, min, value, onChange}: PropsType) => {
    return (
        <div className={s.numberOfCards}>
            <h3>Number of cards</h3>
            <div className={s.numberOfCards_wrapper}>
                <div className={s.numberOfCards_minValue}>{value[0]}</div>
                <Box sx={{width: 155}}>
                    <Slider
                        getAriaLabel={() => 'Number of cards'}
                        min={min}
                        max={max ? max : 100}
                        value={value}
                        onChange={onChange}
                    />
                </Box>
                <div className={s.numberOfCards_maxValue}>{value[1]}</div>
            </div>
        </div>
    )
}