import styled from 'styled-components';
const Wrapper = styled.div`
    display: flow-root;
    background-color: white;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
    border: #66A091 1px solid;
    .float-right{
        float:right;
    }
    .float-left{
        float:left;
        font-weight:bold;
    }
    .not-selected{
        color: gray;
    }
    & div{
        display: inline-block;
    }
    .time-input{
        font-family: auto;
        border: none;
        outline:none;
    }
`;
export default Wrapper;