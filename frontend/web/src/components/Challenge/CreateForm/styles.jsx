import styled from 'styled-components';

const Wrapper = styled.div`
padding: 20px;
margin: 10px;
.titleGrid {
    margin: 0px;
    padding: 0;
}
.grid {
    margin: 50px;
    padding: 10px;
    & h4{
        margin: 70px 0 10px 0;
    }
    & .dateTitle{
        margin-top: 10px;
        color: teal;
    }
}
`;

export default Wrapper;