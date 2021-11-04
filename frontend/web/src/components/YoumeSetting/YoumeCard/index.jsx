import React from 'react';
import Wrapper from './styles';
import { NavLink } from 'react-router-dom';
import {List, ListItem, ListItemText} from '@material-ui/core';
import {useSelector} from 'react-redux'
function App () {
  let {youmeInfo} = useSelector((state)=> state.user)
  return(
    <Wrapper>
        <List>
            <NavLink to="/ConnectYoume" className='router'>
              <ListItem>
                  <ListItemText primary="YOUME 연결" secondary={youmeInfo.connectedYoume?youmeInfo.YoumeId:"연결되지 않음"}/>
              </ListItem>
            </NavLink>
            <NavLink to="/SpeakerRecognization" className='router'>
              <ListItem>
                  <ListItemText primary="목소리 인식" secondary={youmeInfo.connectedSpeaker?"사용 중":"사용하지 않음"}/>
              </ListItem>
            </NavLink>
        </List>
    </Wrapper>
  )
}
export default App;