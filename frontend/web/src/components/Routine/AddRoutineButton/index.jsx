import React from 'react';
import Wrapper from './styles'
function App(props){
  
  return(
      <Wrapper onClick={props.onClick}>
          {props.title}
      </Wrapper>
  );
}
export default App;