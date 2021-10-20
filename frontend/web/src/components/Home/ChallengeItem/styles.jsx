import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
const Wrapper = styled(Paper)`
    padding : 10px;
    border-radius : 10px;
    background-color:white;
    height: 100%;
    .title {
        margin:0px;
        padding: 0px;
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
      background-color: #B5E3D8;
    }
    .MuiLinearProgress-barColorPrimary{
        background-color:#C30707;
    }
    .term{
      background-color: #66A091;
      padding: 5px;
      text-align: center;
      color: white;
      border-radius: 5px;
      margin: 0 5px;
    }
    .confirm-btn{
      background-color: #776D61;
      cursor: pointer;
      padding: 5px;
      text-align: center;
      color: white;
      border-radius: 5px;
      margin: 0 5px;
    }
`;
export default Wrapper;