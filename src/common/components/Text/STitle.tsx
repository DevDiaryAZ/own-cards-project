import styled from "styled-components";
import { SText } from "./SText";

interface TSTitleProps {
    color?: string;
    fontSize?: string;
}
export const STitle = styled(SText)<TSTitleProps>`
    font-weight: bold;
    font-size: ${(props) => props.fontSize || "22px"};
    color: ${(props) => props.color};
`;
