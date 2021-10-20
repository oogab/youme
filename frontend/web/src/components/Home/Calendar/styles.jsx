import styled from 'styled-components';
const Wrapper = styled.div`
    .fc .fc-toolbar-title{
        font-size:1.2em;
    }
    .fc-toolbar-chunk:nth-child(2) >*{
        display: inline-block;
    }

    .fc .fc-popover {
        position: absolute;
        z-index: 1;
        box-shadow: 0 2px 6px rgb(0 0 0 / 15%);
    }

`;
export default Wrapper;