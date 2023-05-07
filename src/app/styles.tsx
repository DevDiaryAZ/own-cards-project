import styled, {css} from "styled-components";

export const SAppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primaryLightest};
  min-height: 100vh;
  max-height: 100vh;
  padding: 15px;
  color: ${({theme}) => theme.colors.textOnSecondary};
  transition: 0.2s;
  transition-property: background-color;
  ${({theme}) => css`
    @media all and (max-width: ${theme.media.small + "px"}) {
      padding: 0 0 20px 0;
      max-height: initial;
    }
  `};
`

// background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.primaryLightest}, ${theme.colors.primary})`};