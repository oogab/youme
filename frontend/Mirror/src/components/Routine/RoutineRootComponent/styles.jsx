import styled from 'styled-components';
const Wrapper = styled.div`
    .progress > div{
        width: 450px;
    }
    .progress-expanded > div{
        z-index:50;
        width:1400px;
        position: fixed;
        left: calc((100% - 1400px)/2);
        top: 56px;
    }
    .no-routine{
        padding:10px;
    }
`;
export default Wrapper;