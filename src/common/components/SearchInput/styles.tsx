import styled, {css} from "styled-components";
import TextField from "@mui/material/TextField";
import {InputBase} from "@mui/material";

export const SForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: inherit;
`;

interface TSInputWrapperProps {
    error?: string;
}

export const SInputWrapper = styled.div<TSInputWrapperProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  position: relative;
  width: 100%;
  ${(props) =>
          props.error &&
          css`
            &:after {
              content: "${props.error}";
              position: absolute;
              color: #fff;
              left: calc(100% + 10px);
              background-color: ${props.theme.colors.severity.error};
              padding: 3px 10px;
              font-size: 12px;
              max-width: 415px;
              width: 100%;
              z-index: ${props.theme.orders.inputErrors};
              border-radius: 5px;
              opacity: 0;
              visibility: hidden;
              transition: 0.2s;
              @media all and (max-width: 800px) {
                left: initial;
                right: 10px;
                margin: 0 auto;
                bottom: 8px;
              }
            }

            &:hover {
              &:after {
                opacity: 1;
                visibility: visible;
              }
            }
          `}
`;

interface TSInputProps {
    isError?: boolean;
    hasRightIcon?: boolean;
    hasLeftIcon?: boolean;
}

export const SInput = styled(InputBase)<TSInputProps>`
  &.MuiInputBase-root {
    border: none;
    outline: none;
    border-radius: 20px;
    width: 100%;
    max-width: none;
    min-width: auto;
  }

  input {
    display: block;
    padding: 10px 15px 10px 38px;
    border-radius: 20px;
    background-color: ${({theme}) => theme.colors.input.background};
    border: 1px solid rgba(0, 0, 0, 0.2);
    width: 100%;
    transition-property: background-color;
    transition: 0.2s;
    font-size: 14px;
    height: 100%;
    min-height: 40px;
    box-sizing: border-box;
    min-width: auto;
    max-width: none;

    &:hover {
      opacity: 0.8;
    }

    &:focus {
      border: 1px solid rgba(0, 0, 0, 0.2);
      opacity: 1;
    }

    ${(props) =>
            props.isError &&
            css`
              border: 1px solid ${props.theme.colors.severity.error};

              &:focus {
                border: 1px solid ${props.theme.colors.severity.error};
              }
            `}
    &::placeholder {
      font-size: 14px;
      opacity: 0.4;
    }

    ${(props) =>
            props.hasLeftIcon &&
            css`
              padding-left: 40px;
            `}
    ${(props) =>
            props.hasRightIcon &&
            css`
              padding-right: 35px;
            `}
  }`;

export const SInputLeftIcon = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  left: 10px;
  top: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 100;
`;

export const SInputRightIcon = styled(SInputLeftIcon)`
  left: initial;
  right: 0;
  pointer-events: initial;
  cursor: pointer;
`;

export const WithFormTitle = styled.div<{ title: string }>`
  position: relative;
  margin-top: 20px;

  &:before {
    content: "${(props) => props.title}";
    position: absolute;
    top: -25px;
    left: 8px;
    padding: 3px 10px;
    font-size: 13px;
    opacity: 0.4;
  }
`;