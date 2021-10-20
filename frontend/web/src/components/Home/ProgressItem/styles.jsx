import styled from 'styled-components';
const Wrapper = styled.div`
    width:100%;
    .progress-btn{
        width: 30px;
        height: auto;
        color: white;
    }
    .assist{
        background-color:#776D61;
        padding: 20px;
    }
    .assist > * {
        color:white;
    }

    .time {
        text-align: center;
        align-self: center;
        font-size: 30px;
    }

    .complete-btn{
        background-color:gray;
    }
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
    .progress-content{
        height: 100%;
        min-height: 200px;
        padding: 0px;
        border: 1px solid #EEEEEE;
    }

    .play-btns{
        place-content: center;
        height:30%;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        border-bottom: 1px solid #EEEEEE;
    }

    .text-area{
        height:70%;
        border-top: none;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        margin: 10px;
    }
    .text-area > textarea{
        width:100%;
        height:100%;
        padding:10px;
        border:none;
        resize:none;
        border-radius: inherit;
    }
    
    .btn{
        margin-left:0px;
    }
`;
export default Wrapper;