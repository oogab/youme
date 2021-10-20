import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import store from 'store';

import { useTheme } from '@material-ui/core/styles';
import {connect, useDispatch, useSelector} from 'react-redux';
import { TOGGLE_DRAWER } from '../../reducers/layout';

import {
  Grid,
  Typography,
  AppBar,
  IconButton,
  useMediaQuery,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Wrapper from './styles';
import './index.css';

const Header = (state) => {
  let history = useHistory();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const dispatch = useDispatch()
  const { drawerOpen } = useSelector((state) => state.layout)

  const onClickRedirectPathHandler = name => e => {
    window.scrollTo(0, 0);
    if (name === '/SearchVote') {
      if (history.location.pathname === name) {
        history.goBack();
        store.remove('search');
      } else {
        history.push(name);
      }
    } else {
      history.push(name);
    }
  };

  const onToggleDrawer = useCallback(() => {
    dispatch({
      type: TOGGLE_DRAWER
    })
  }, [dispatch])

  return (
    <>
      <Wrapper>
        {isTablet && (
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            aria-label="open drawer"
            onClick={onToggleDrawer}
            className={drawerOpen ? 'menu-button on' : 'menu-button'}
          >
            <Grid></Grid>
            <Grid></Grid>
            <Grid></Grid>
          </Grid>
        )}
        <AppBar
          position="fixed" style={{background:'#89DDBF'}}
          className={drawerOpen ? 'appbar appbar-shift' : 'appbar'}
        >
          <Grid container justifyContent={!isTablet?'space-between':'space-evenly'} alignItems="center">
            <Grid item>
              <Typography
                variant="h6"
                className="logo"
                style={{ fontFamily: 'BAUHS93' }}
                onClick={onClickRedirectPathHandler('/')}
              >
                MYME
              </Typography>
            </Grid>


            <Grid item>
              <Grid container alignItems="center" style={{visibility: "hidden"}}>
                <Grid item>
                  <IconButton
                    aria-label="delete"
                  >
                    <SearchIcon
                      fontSize='medium'
                      color="inherit"
                      htmlColor="#eeeeee"
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </AppBar>
      </Wrapper>
    </>
  );
};

//export default Header;

const mapStateToProps= (state) =>{

  return {
    state: state
  }
}

export default connect(
  mapStateToProps
)(Header);