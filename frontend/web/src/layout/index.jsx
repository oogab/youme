import React from 'react';
import Header from './Header/';
import Drawer from './Drawer/';
import { CssBaseline, Container} from '@material-ui/core';
import Wrapper from './styles';
import {useMediaQuery} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import {connect, useSelector} from 'react-redux';

const Layout = props => {
  const theme = useTheme();
  const { wannaHide, children } = props;
  const isNotTablet = useMediaQuery(theme.breakpoints.down('md'));
  const { drawerOpen } = useSelector((state) => state.layout)

  return (
    <Wrapper>
      <CssBaseline />
      
      <Drawer isNotTablet={isNotTablet} />
      {!wannaHide && <Header />}
      <Container
        open={drawerOpen}
        className={isNotTablet ? 'content' : 'content content-shift'}
        maxWidth="xl"
      >
        <div className="container">{children}</div>
      </Container>
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

export default connect(
  mapStateToProps
)(Layout);