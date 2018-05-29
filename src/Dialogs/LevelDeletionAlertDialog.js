import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const LevelDeletionAlertDialog = (props) => {
  const { deleteDialogOpen, closeDeleteDialog, handleDeleteLevel } = props;
  return (
    <Dialog
      open={deleteDialogOpen}
      onClose={closeDeleteDialog}
      aria-labelledby='alert-deletion-title'
      aria-describedby='alert-deletion-description'
    >
      <DialogTitle id='alert-deletion-title'>Deleting tracker level</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-deletion-description'>
          Are you sure you want to delete this tracker level?
              </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDeleteDialog}>No</Button>
        <Button onClick={handleDeleteLevel}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
}

export default LevelDeletionAlertDialog;