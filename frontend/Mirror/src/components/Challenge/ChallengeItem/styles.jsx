import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
const Wrapper = styled.div`
    display: inline-block;
    padding : 10px;
    border-radius : 4px;
    height: max-content;
    margin:5px;
    border:2px solid #ffffff;
    text-align-last: center;
    text-align: -webkit-center;
    width: -webkit-fill-available;
    .title {
        margin:0px;
        padding: 5px;
        text-align: center;
    }
    & > div {
        margin-bottom : 5px;
    }
    .float-right {
        float:right;
    }
    .MuiLinearProgress-root{
      height: 10px;
      background-color: #626970;
    }
    .MuiLinearProgress-barColorPrimary{
        background-color:red;
    }
    .term{
      background-color: #050505;
      padding: 5px;
      text-align: center;
      color: white;
      border-radius: 5px;
      margin: 0 5px;
    }
    .confirm-btn{
      cursor: pointer;
      padding: 5px;
      text-align: center;
      color: black;
      border-radius: 5px;
      margin: 0 5px;
    }
    .more-btn{
      color: white;
    }
    .period{
      white-space: nowrap;
    }
`;
export default Wrapper;