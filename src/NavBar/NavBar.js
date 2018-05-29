import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import styled from 'styled-components';

const NavBarHeader = styled.span`
  color: black;
  font-weight: 600;
`;

const NavBar = () => {
  return (
    <div>
      <AppBar style={{ backgroundColor: '#247D96' }} position='fixed'>
        <Toolbar>
          <IconButton aria-label='Menu'>
            <MenuIcon />
          </IconButton>
          <NavBarHeader>Forex Tracker</NavBarHeader>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;