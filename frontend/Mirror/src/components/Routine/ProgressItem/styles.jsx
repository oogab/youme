import styled from 'styled-components';
import CustomCard from '../CustomCard';
const Wrapper = styled(CustomCard)`

    .video-container {
        position: relative;
        padding-bottom: 56.25%;
        padding-top: 30px;
        height: 0;
        overflow: hidden;
    }
    .video-container iframe,
    .video-container object,
    .video-container embed {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .MuiTab-root{
        min-width:50px
    }
    .active-tab{
        color:lightcoral;
    }
    .no-active-tab{
        color:white;
    }

    .content-typography{
        margin: 10px;
    }
    .progress-header{
        border-bottom: 2px solid #ffffff;
        padding-left: 20px;
        height:49px;
        line-height:49px;
    }
    .progress-footer{
        border-top: 2px solid #ffffff;
    }
    .progress-article{
        background-color:#050505;
    }

    .progress-btn{
        color:white;
    }
    .progress-btn:hover{
        color:deepskyblue;
    }
`;
export default Wrapper;