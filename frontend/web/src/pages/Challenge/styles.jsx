import styled from 'styled-components';

const Wrapper = styled.div`
  width: auto;
  padding: 10px;
  hr {
    border: #dbdbdb 1px solid;
    margin-top: 10px;
  }
  .grid {
    margin: 20px 0;
  }
  .grid {
    & .CardContent {
      margin-top: 10px;
    }
    & .TotalCard {
      margin-bottom: 20px;
    }
  }
  .term{
    background-color: #66A091;
    padding: 5px;
    text-align: center;
    color: white;
    border-radius: 5px;
    margin: 0% 2.5% 0% 2.5%;
  }
  
`;

export default Wrapper;

