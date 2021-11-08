import styled from 'styled-components';
import {Card} from '@material-ui/core'
const Wrapper = styled(Card)`
    .audio-react-recorder{
        display:none;
    }
    .MuiGrid-root{
        text-align:center;
        padding-top:20px;
        padding-bottom:20px;
    }
    .icon-btn{
        width: 80px;
        height: auto;
    }
`;
export default Wrapper;