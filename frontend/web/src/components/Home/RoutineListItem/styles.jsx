import styled from 'styled-components';
const Wrapper = styled.div`
    margin-bottom:10px;
    .routine-list-item{
        background-color:unset;
        box-shadow:none;
    }
    .panel-summary{
        border-radius: inherit;
        background-color: #89DDBF;
        box-shadow:0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
    }
    .panel-summary-success{
        background-color: #776D61;
    }
    .routine-list-item-detail{
        background-color:unset;
        padding: 0px;
    }
    .title{
        color: white;
    }
    .items{
        padding-left: 0px;
        padding-right: 0px;
    }
    .accordian-detail-list{
        width:100%;
    }
    .name-title{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .MuiAccordionSummary-content{
        min-width: 0px;
    }
    .time-title{
        text-align:right;
    }
`;
export default Wrapper;