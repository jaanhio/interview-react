import React, { Component } from 'react';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MoreOptionsIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import LevelDeletionAlertDialog from '../Dialogs/LevelDeletionAlertDialog';
import EditAlertLevelDialog from '../Dialogs/EditAlertLevelDialog';
import AddNewAlertLevelDialog from '../Dialogs/AddNewAlertLevelDialog';

class AlertLevelPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      deleteDialogOpen: false,
      editDialogOpen: false,
      addNewDialogOpen: false,
      levelId: props.alertLevelDetails.alertLevelId,
      alertLevel: props.alertLevelDetails.alertLevel,
      newAlertLevel: ''
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
    const { levelId } = this.state;
    axios.post(`http://localhost:5000/api/level/${levelId}/delete`)
      .then(res => {
        console.log(res.data);
        this.closeDeleteDialog();
        this.handleCloseMenu();
        this.props.fetchTrackersData();
      });
  };

  openDialogs = name => () => {
    this.setState({
      [name]: true
    });
  }


  closeDeleteDialog = () => {
    this.setState({
      deleteDialogOpen: false
    });
  };

  closeEditDialog = () => {
    this.setState({
      editDialogOpen: false,
      alertLevel: this.props.alertLevelDetails.alertLevel
    });
  };


  closeAddNewAlertDialog = () => {
    this.setState({
      addNewDialogOpen: false
    });
  }

  handleAlertLevelInputs = name => event => {
    this.setState({
      [name]: event.target.value
    });
  }

  handleAlertLevelUpdateSubmission = () => {
    const { levelId, alertLevel } = this.state;
    const { fetchTrackersData } = this.props;
    axios.post(`http://localhost:5000/api/level/${levelId}/update`, {
      alertLevel: alertLevel
    })
      .then(res => {
        fetchTrackersData();
        this.closeEditDialog();
      });
  };

  handleAddNewAlertLevel = () => {
    const { newAlertLevel } = this.state;
    const { trackerId, fetchTrackersData } = this.props;
    axios.post(`http://localhost:5000/api/tracker/${trackerId}/level/new`, {
      alertLevel: newAlertLevel
    })
      .then(res => {
        fetchTrackersData();
        this.closeAddNewAlertDialog();
        this.setState({
          newAlertLevel: ''
        });
      });
  }

  render() {
    const { alertLevelDetails } = this.props;
    const { anchorEl, deleteDialogOpen, alertLevel, editDialogOpen, addNewDialogOpen, newAlertLevel } = this.state;
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
          <MenuItem onClick={this.openDialogs('addNewDialogOpen')}>Add New Alert</MenuItem>
          <MenuItem onClick={this.openDialogs('editDialogOpen')}>Edit</MenuItem>
          <MenuItem onClick={this.openDialogs('deleteDialogOpen')}>Delete</MenuItem>
        </Menu>
        <LevelDeletionAlertDialog
          deleteDialogOpen={deleteDialogOpen}
          closeDeleteDialog={this.closeDeleteDialog}
          handleDeleteLevel={this.handleDeleteLevel}
        />
        <EditAlertLevelDialog
          editDialogOpen={editDialogOpen}
          closeEditDialog={this.closeEditDialog}
          alertLevel={alertLevel}
          handleAlertLevelInputs={this.handleAlertLevelInputs('alertLevel')}
          handleAlertLevelUpdateSubmission={this.handleAlertLevelUpdateSubmission}
        />
        <AddNewAlertLevelDialog
          addNewDialogOpen={addNewDialogOpen}
          closeAddNewAlertDialog={this.closeAddNewAlertDialog}
          handleAddNewAlertLevel={this.handleAddNewAlertLevel}
          handleAlertLevelInputs={this.handleAlertLevelInputs('newAlertLevel')}
          newAlertLevel={newAlertLevel}
        />
      </ExpansionPanelDetails>
    );
  }
}

export default AlertLevelPanel;