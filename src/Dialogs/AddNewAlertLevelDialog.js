import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
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

const AddNewAlertLevelDialog = (props) => {
  const { addNewDialogOpen, closeAddNewAlertDialog, handleAddNewAlertLevel, newAlertLevel, handleAlertLevelInputs } = props;
  return (
    <Dialog
      fullScreen
      open={addNewDialogOpen}
      onClose={closeAddNewAlertDialog}
      TransitionComponent={Transitions}
    >
      <AppBar style={{ backgroundColor: 'white', boxShadow: 'none' }}>
        <Toolbar>
          <IconButton onClick={closeAddNewAlertDialog} aria-label='Close'>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <StyledForm>
        <TextField
          required
          id='alertLevel'
          label='Alert Level'
          value={newAlertLevel}
          onChange={handleAlertLevelInputs}
          style={{ width: '70vw', alignSelf: 'center', marginBottom: 20 }}
        />
        <Button onClick={handleAddNewAlertLevel} style={{ backgroundColor: '#247D96', color: 'white', width: '50%', alignSelf: 'center' }}>Add Alert</Button>
      </StyledForm>
    </Dialog>
  )
}

export default AddNewAlertLevelDialog;
