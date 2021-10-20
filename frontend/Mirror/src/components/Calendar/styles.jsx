import styled from 'styled-components';
const Wrapper = styled.div`
    .fc-theme-standard .fc-scrollgrid{
        border: 1px solid #ffffff;
        border-radius:5px;
    }
    
    .fc-theme-standard td, .fc-theme-standard th{
        border: 1px solid #ffffff;
    }
    .fc .fc-button-primary {
        color: #fff;
        color: var(--fc-button-text-color, #fff);
        background-color: rgba(0,0,0,0);
        background-color: var(--fc-button-bg-color, #ffffff00);
        border-color: #fff;
        border-color: var(--fc-button-border-color, #ffffff00);
    }
    .fc .fc-popover-header {
        color: black;
    }
    .fc .fc-more-popover .fc-popover-body {
        color: black;
    }
    .fc .fc-more-popover .fc-popover-body .fc-more-popover-misc{
        height: 0;
    }
    .fc-event-title .fc-sticky{
        color: black;
    }
`;
export default Wrapper;