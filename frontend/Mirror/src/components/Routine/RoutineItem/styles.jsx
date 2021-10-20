import styled from 'styled-components';
import {ListItem} from '@material-ui/core';
const Wrapper = styled(ListItem)`
    border-radius:4px;
    border:2px solid #ffffff;
    cursor: pointer;
    &:hover{
        background-color:#111111;
    }
    .text{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        height:58px;
        line-height:58px;
    }

    .achieve{
        color:white;
    }
    .no-achieve{
        color:deepskyblue;
    }
`;
export default Wrapper;