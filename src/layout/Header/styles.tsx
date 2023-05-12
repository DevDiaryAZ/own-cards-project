import styled, { css } from 'styled-components'

export const SHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.textOnPrimary};
  // background-color: ${({ theme }) => theme.colors.primaryDark};
  background: ${({ theme }) =>
    `linear-gradient(225deg, ${theme.colors.primary}, ${theme.colors.primaryDark})`};
  padding: 0 30px;
  max-height: ${({ theme }) => theme.sizes.headerHeight + 'px'};
  min-height: ${({ theme }) => theme.sizes.headerHeight + 'px'};
  gap: 20px;
  border-radius: 20px;
  overflow: auto;
  width: 100%;
  ${({ theme }) => css`
    @media all and (max-width: ${theme.media.small + 'px'}) {
      border-radius: 0;
      padding: 0 20px;
    }
  `}
`

export const SHeaderLogo = styled.div`
  font-size: large;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.primaryLightest};
  width: 100%;
  text-transform: uppercase;
`
