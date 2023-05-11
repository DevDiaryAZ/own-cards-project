import Box from '@mui/material/Box'
import {Slider} from "@mui/material"
import s from './CardRange.module.css'
import styled from "styled-components";
import {SText} from "common/components/Text/SText";

type PropsType = {
    max: number
    min: number
    value: number[]
    onChange: (event: Event, newValue: number | number[]) => void
}

const SSlider = styled(Slider)`
  &.MuiSlider-root {
    color: ${({theme}) => theme.colors.button.success};
    outline: none;
    box-shadow: navajowhite;
  }
`

export const CardRange = ({max, min, value, onChange}: PropsType) => {
    return (
        <>
            <SText fontWeight={"600"} fontSize={"16px"} whiteSpace={"nowrap"} greyColor>Number of cards</SText>
            <div className={s.numberOfCards_wrapper}>
                <SText margin={"0 20px"} fontWeight={"600"} fontSize={"16px"} whiteSpace={"nowrap"}
                       greyColor  display={"flex"}  alignItems={"center"}>{value[0]}</SText>
                <Box sx={{width: 155}}>
                    <SSlider
                        getAriaLabel={() => 'Number of cards'}
                        min={min}
                        max={max ? max : 100}
                        value={value}
                        onChange={onChange}
                    />
                </Box>
                <SText display={"flex"} alignItems={"center"} margin={"0 20px"} fontWeight={"600"} fontSize={"16px"} whiteSpace={"nowrap"}
                       greyColor>{value[1]}</SText>
            </div>
        </>
    )
}

