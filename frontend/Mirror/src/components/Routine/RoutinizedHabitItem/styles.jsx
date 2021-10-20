import styled from 'styled-components';
import {ListItem} from '@material-ui/core';
const Wrapper = styled(ListItem)`
    border:2px solid #ffffff;
    border-radius:4px;
    background-color:#050505;
    cursor: pointer;
    &:hover{
        background-color:#111111;
    }
    .habit-name{
        height: 58px;
        line-height: 58px;
    }
    .routine-title{
        margin-left:26px;
    }
    .MuiCheckbox-colorSecondary.Mui-disabled{
        color:#C2BDAC;
    }
`;
export default Wrapper;