import styled from 'styled-components';
import CustomCard from '../CustomCard';
const Wrapper = styled(CustomCard)`
    height: 428.41px;
    .progress-header{
        border-bottom: 2px solid #ffffff;
        height:49px;
        line-height:49px;
    }
    .content{
        height: 354px;
        overflow: auto;
    }
`;
export default Wrapper;