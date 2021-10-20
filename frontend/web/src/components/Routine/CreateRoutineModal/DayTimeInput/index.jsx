import React from 'react';
import Wrapper from './styles'

function App(props){
    return(
        <Wrapper>
            <span className={!props.clicked?'float-left not-selected':'float-left'}>{props.dayName}요일</span>
            <div className='float-right'>
            <span><input type='time' className='time-input' defaultValue={props.timeInfo} readOnly={!props.clicked} onChange={(e)=>props.change(e, props.idx)}></input></span>
            </div>
        </Wrapper>
    );
}
export default App;