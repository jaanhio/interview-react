import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import styled from 'styled-components';
import Transitions from '../Transitions/Transitions';

const StyledForm = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

const SetAlertLevelDialog = (props) => {
  const { handleAlertLevelInput, alertLevelDialogOpen, closeAlertLevelDialog, newTrackerId, alertLevel, handleAlertLevelSubmission } = props;
  return (
    <Dialog
      fullScreen
      open={alertLevelDialogOpen}
      onClose={closeAlertLevelDialog}
      TransitionComponent={Transitions}
    >
      <AppBar style={{ backgroundColor: 'white', boxShadow: 'none' }}>
        <Toolbar>
          <IconButton onClick={closeAlertLevelDialog} aria-label='Close'>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <StyledForm>
        <TextField
          required
          id='alertLevel'
          label='Alert Level'
          value={alertLevel}
          onChange={handleAlertLevelInput}
          style={{ width: '70vw', alignSelf: 'center', marginBottom: 20 }}
        />
        <Button onClick={handleAlertLevelSubmission} style={{ backgroundColor: '#247D96', color: 'white', width: '50%', alignSelf: 'center' }}>Add Alert</Button>
      </StyledForm>
    </Dialog>
  )
}

export default SetAlertLevelDialog;
