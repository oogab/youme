import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ReplayIcon from '@material-ui/icons/Replay';
import { useSelector, useDispatch } from 'react-redux';
import { logoutRequestAction } from '../../../reducers/user';
import Wrapper from './styles';
import { MenuItem, Switch, Grid } from '@material-ui/core';
import DarkMenu from '../DarkMenu';
const App=(props)=>{
    let {routineVisible, routineHandleChange, challengeVisible, challengeHandleChange} = props
    const { me, logOutError } = useSelector((state) => state.user)
    let history = useHistory();
    const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
    useEffect(() => {
        if (!me) {
          history.push('/')
        }
        if (logOutError) {
          console.log(logOutError)
        }
      }, [me, logOutError, history])

    const onSignOut = useCallback(() => {
        dispatch(logoutRequestAction())
      }, [me, dispatch])

    function reload(){
      window.location.replace("/Home")
    }

  
  return(
      <Wrapper>
          <IconButton onClick={handleClick}>
            <VisibilityIcon className='btn'/>
          </IconButton>
          <DarkMenu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              width: '20ch',
            },
          }}
        >
          <MenuItem>
            <Grid container>
              <Grid item xs={6}>
                챌린지
              </Grid>
            </Grid>
              <Grid item xs={6}>
                <Switch checked={challengeVisible} onChange={challengeHandleChange}/>
              </Grid>
            </MenuItem>
          <MenuItem>
          <Grid container>
              <Grid item xs={6}>
                루틴
              </Grid>
            </Grid>
              <Grid item xs={6}>
                <Switch checked={routineVisible} onChange={routineHandleChange}/>
              </Grid>
          </MenuItem>
        </DarkMenu>
          <IconButton onClick={onSignOut}>
            <ExitToAppIcon className='btn'/>
          </IconButton>
          <IconButton onClick={reload}>
             <ReplayIcon className='btn'/>
          </IconButton>
      </Wrapper>
  )

}
export default App;