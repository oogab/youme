import styled from 'styled-components';
const Wrapper = styled.div`
    .challenge-card{
      height:395px;
    }
    .slick-dots li button:before {
      color:white;
     }
    .slick-dots li.slick-active button:before {
      color:lightcoral;
    }
    .slick-initialized .slick-slide{
      text-align-last: center;
    }
    .slider-div{
      border-top: 2px solid #ffffff;
      border-bottom: 2px solid #ffffff;
      padding-bottom: 26px;
    }
`;
export default Wrapper;