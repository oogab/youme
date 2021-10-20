import styled from 'styled-components';
const Wrapper = styled.div`
    margin-bottom: 10px;
    margin-top: 10px;
    .clicked{
        background-color:lightgray;
    }
    .text-content{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        line-height: 16px;
        max-height: 48px;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
    .text-title{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;
export default Wrapper;