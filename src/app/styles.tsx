import styled, { css } from 'styled-components'

export const SAppWrapper = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primaryLightest};
  color: ${({ theme }) => theme.colors.textOnSecondary};
  display: flex;
  flex-direction: column;
  max-height: initial;
  min-height: 100vh;
  padding: 15px;
  transition: 0.2s;
  transition-property: background-color;
  ${({ theme }) => css`
    @media all and (max-width: ${theme.media.small + 'px'}) {
      padding: 0 0 20px 0;
      max-height: initial;
    }
  `};
`

// background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.primaryLightest}, ${theme.colors.primary})`};
