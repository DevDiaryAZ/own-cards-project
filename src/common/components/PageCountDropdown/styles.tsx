import styled, {css} from "styled-components";

type TInputProps = {
    isOpen?: boolean;
    isHovered?: boolean;
};

export const SSuperOption = styled.div<TInputProps>`
    padding: 5px 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 10px;
    transition: 0.2s;
    cursor: pointer;

    &:last-of-type {
        border-bottom: none;
    }

    ${(props) =>
    props.isHovered &&
    css`
            transform: scale(0.9);
            background-color: ${props.theme.colors.input.default};
            padding: 5px 10px;
        `},
`;

export const SPageCountDropdownWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  border-radius: 10px;
  width: 55px;
`;

export const SPageCountDropdownSelectedItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 5px 5px 10px;
  border-radius: inherit;
  gap: 5px;
  width: 100%;
  column-gap: 5px;
  cursor: pointer;
  font-size: 12px;
  color: ${(props) => props.theme.colors.secondaryLight};
  background-color: ${(props) => props.theme.colors.button.success};
  transition: 0.2s;

  svg {
    width: 18px;
    height: 18px;
    opacity: 0.5;

    path {
      fill: ${(props) => props.theme.colors.secondaryLight};
    }
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const SSuperOptionsList = styled.div<{ isDisabled?: boolean }>`
    justify-self: center;
    position: absolute;
    top: 40px;
    max-width: 100%;
    width: calc(100% - 20px);
    color: ${({ theme }) => theme.colors.textOnSecondary};
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.secondaryLight};
    max-height: 160px;
    padding: 5px 0;
    overflow: auto;
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.1);
    z-index: ${({ theme }) => theme.orders.dropdown};
    ${(props) =>
    props.isDisabled &&
    css`
            pointer-events: none;
        `}
`;

export const SPageCountDropdown = styled(SSuperOptionsList)`
    text-align: center;
    flex-direction: column;
    position: absolute;
    bottom: calc(100% + 10px);
    width: 100%;
    top: initial;
    z-index: ${(props) => props.theme.orders.dropdown};
`;

type TSPageCountDropdownItemProps = {
    isActive?: boolean;
    isDisabled?: boolean;
};
export const SPageCountDropdownItem = styled(SSuperOption)<TSPageCountDropdownItemProps>((props) => ({
    display: "flex",
    height: "max-content",
    padding: "5px",
    textAlign: "center",
    justifyContent: "center",
    borderRadius: "inherit",
    color: props.theme.colors.textOnSecondary,
    cursor: "pointer",
    transform: "scale(0.8)",
    ...(props.isActive && {
        pointerEvents: "none",
        transform: "scale(1)",
        backgroundColor: "rgba(0, 0, 0, 0.05)",
    }),
    ...(props.isDisabled && {
        pointerEvents: "none",
        opacity: 0.4,
    }),
    "&:hover": {
        transform: "scale(1)",
        backgroundColor: "rgba(0, 0, 0, 0.05)",
    },
}));
