import React from 'react';
import Wrapper from './styles';
import { NavLink } from 'react-router-dom';
import {List, ListItem, ListItemText} from '@material-ui/core';
function App () {
  return(
    <Wrapper>
        <List>
            <NavLink to="/ConnectYoume" className='router'>
              <ListItem>
                  <ListItemText primary="YOUME 연결" secondary="ym-203"/>
              </ListItem>
            </NavLink>
            <NavLink to="/SpeakerRecognization" className='router'>
              <ListItem>
                  <ListItemText primary="목소리 인식" secondary="사용중"/>
              </ListItem>
            </NavLink>
        </List>
    </Wrapper>
  )
}
export default App;