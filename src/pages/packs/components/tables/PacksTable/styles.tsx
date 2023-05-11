import styled from "styled-components";
import TableContainer from "@mui/material/TableContainer";
import {Table} from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";

export const STableContainer = styled(TableContainer)`
  border-radius: 20px;
  background-color: ${({theme}) => theme.colors.secondaryLight};
`

export const STable = styled(Table)`
  border-radius: 20px;

  & tr {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 2fr 1fr;
    border-bottom: 1px solid ${({theme}) => theme.colors.secondaryLightAlpha07};
  }

  & th, & td  {
    padding: 12px 15px;
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
    border: none;
  }
  & tr td:first-child  {
    font-weight: 600;
  }
`

export const STableHead = styled(TableHead)`
  background-color: ${({theme}) => theme.colors.secondaryLightAlpha07};

  & th {
    font-weight: 600;
  }
`