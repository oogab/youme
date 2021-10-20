import styled from 'styled-components';

const Wrapper = styled.div`
  hr {
    border: white 1px solid;
    margin-top: 10px;
  }
  .grid {
    margin: 20px 0;
  }
  .grid {
    & .CardContent {
      margin-top: 30px;
    }
    & .TotalCard {
      margin-bottom: 20px;
    }
  }
`;

export default Wrapper;