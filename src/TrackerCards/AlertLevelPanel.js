import React, { Component } from 'react';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MoreOptionsIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class AlertLevelPanel extends Component {
  // state = {
  //   anchorEl: null,
  //   deleteDialogOpen: false,
  //   levelId: 
  // };

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      deleteDialogOpen: false,
      levelId: props.alertLevelDetails.alertLevelId
    }
  }

  handleOpenMenu = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleCloseMenu = () => {
    this.setState({
      anchorEl: null
    });
  };

  handleDeleteLevel = () => {

  };

  openDeleteDialog = () => {
    this.setState({
      deleteDialogOpen: true
    });
  };

  closeDeleteDialog = () => {
    this.setState({
      deleteDialogOpen: false
    });
  }

  render() {
    const { alertLevelDetails } = this.props;
    const { anchorEl, deleteDialogOpen } = this.state;
    return (
      <ExpansionPanelDetails key={alertLevelDetails.alertLevelid} style={{ display: 'flex' }}>
        <div style={{ width: '100%', alignSelf: 'center' }}>
          SET {alertLevelDetails.alertLevel}
        </div>
        <IconButton
          aria-owns={anchorEl ? 'menu' : null}
          aria-haspopup='true'
          onClick={this.handleOpenMenu}
        >
          <MoreOptionsIcon />
        </IconButton>
        <Menu
          id='menu'
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleCloseMenu}
        >
          <MenuItem>Add New Alert</MenuItem>
          <MenuItem>Edit</MenuItem>
          <MenuItem onClick={this.openDeleteDialog}>Delete</MenuItem>
          <Dialog
            open={deleteDialogOpen}
            onClose={this.closeDeleteDialog}
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
              <Button onClick={this.closeDeleteDialog}>No</Button>
              <Button>Yes</Button>
            </DialogActions>
          </Dialog>
        </Menu>
      </ExpansionPanelDetails>
    );
  }
}

export default AlertLevelPanel;