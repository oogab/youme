import React from 'react';
import Wrapper from './styles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
function App(props){
  
  return(
      <Wrapper>
        <Card className={props.clickedHabit===props.idx?'clicked':' '} onClick={props.onClick}>
            <CardContent>
                <h2 className='text-title'>
                    {props.habit.name}
                </h2>
                <h3 style={{color:'darkgray'}}>
                    {props.habit.time_required}분
                </h3>
                <p className='text-content'>
                    {props.habit.content}
                </p>
            </CardContent>
        </Card>
      </Wrapper>
  );
}
export default App;