import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
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

const EditAlertLevelDialog = (props) => {
  const { editDialogOpen, closeEditDialog, alertLevel, handleAlertLevelInputs, handleAlertLevelUpdateSubmission } = props;
  return (
    <Dialog
      fullScreen
      open={editDialogOpen}
      onClose={closeEditDialog}
      TransitionComponent={Transitions}
    >
      <AppBar style={{ backgroundColor: 'white', boxShadow: 'none' }}>
        <Toolbar>
          <IconButton onClick={closeEditDialog} aria-label='Close'>
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
          onChange={handleAlertLevelInputs}
          style={{ width: '70vw', alignSelf: 'center', marginBottom: 20 }}
        />
        <Button onClick={handleAlertLevelUpdateSubmission} style={{ backgroundColor: '#247D96', color: 'white', width: '50%', alignSelf: 'center' }}>Update</Button>
      </StyledForm>
    </Dialog>
  );
}

export default EditAlertLevelDialog;