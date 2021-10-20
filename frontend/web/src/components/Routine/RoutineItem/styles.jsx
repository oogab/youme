import styled from 'styled-components';
const Wrapper = styled.div`
    width: auto;
    .routine-item{
        margin-bottom : 10px;
        width:100%;
    }
    .details{
        display: block;
    }
    .modify-btn{
        width: 25px;
        height: auto;
        color: darkgray;
        margin: 10px;
    }

    #add-btn{
        color:#5FA16A;
    }

    #delete-btn{
        color:#A1777F;
    }

    #save-btn{
        color:#6F93A1;
    }
    .MuiAccordionSummary-content{
       min-width:0px;
    }
    .title{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .button-div{
        text-align: center;
    }
`;
export default Wrapper;