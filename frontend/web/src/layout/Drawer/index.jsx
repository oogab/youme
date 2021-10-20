import React from 'react';

import {connect, useSelector} from 'react-redux';
import Hidden from '@material-ui/core/Hidden';
import {
  Divider,
  Drawer,
} from '@material-ui/core';
import Wrapper from './styles';
import DrawerListGroup from './DrawerListGroup/index';

function PersistentDrawerLeft(state) {
  const { drawerOpen } = useSelector((state) => state.layout)

  return (
    <Wrapper>
      <Drawer
        className="drawer"
        variant="persistent"
        anchor="left"
        open={drawerOpen}
      >
        <Divider />
        <DrawerListGroup />
      </Drawer>
      <Hidden mdDown>
        <Drawer
          className="drawer drawer-tablet"
          variant="persistent"
          open
        >
          <Divider />
          <DrawerListGroup />
        </Drawer>
      </Hidden>
    </Wrapper>
  );
}

const mapStateToProps= (state) =>{
  return state
}

export default connect(
  mapStateToProps
)(PersistentDrawerLeft);