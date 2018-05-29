import React, { Component } from 'react';
import NavBar from './NavBar/NavBar';
import Buttons from './Buttons/Buttons';
import TrackersSection from './TrackersSection/TrackersSection';
import axios from 'axios';
import AddCurrencyDialog from './Dialogs/AddCurrencyDialog';
import SetAlertLevelDialog from './Dialogs/SetAlertLevelDialog';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import Transitions from './Transitions/Transitions';

const Transition = (props) => {
  return (
    <Slide direction='up' {...props} />
  );
}

class App extends Component {
  state = {
    trackers: [],
    currencyDialogOpen: false,
    alertLevelDialogOpen: false,
    currency1Id: '',
    currency2Id: '',
    alertLevel: '',
    newTrackerId: ''
  }

  componentDidMount() {
    this.fetchTrackersData();
  };

  fetchTrackersData = () => {
    axios.get('http://localhost:5000/api/trackers')
      .then(res => {
        this.setState({
          trackers: res.data
        });
      });
  }

  closeCurrencyDialog = () => {
    this.setState({
      currencyDialogOpen: false
    });
  };

  openCurrencyDialog = () => {
    this.setState({
      currencyDialogOpen: true
    });
  };

  closeAlertLevelDialog = () => {
    this.setState({
      alertLevelDialogOpen: false
    });
  };

  openAlertLevelDialog = () => {
    this.setState({
      alertLevelDialogOpen: true
    });
  }

  handleCurrency1Selection = event => {
    this.setState({
      currency1Id: event.target.value
    });
  };

  handleCurrency2Selection = event => {
    this.setState({
      currency2Id: event.target.value
    });
  };

  handleAlertLevelInput = event => {
    this.setState({
      alertLevel: event.target.value
    });
  };

  handleCurrencyPageSubmission = () => {
    this.closeCurrencyDialog();
    this.openAlertLevelDialog();
    axios.post('http://localhost:5000/api/tracker/new', {
      currency1Id: this.state.currency1Id,
      currency2Id: this.state.currency2Id
    })
      .then(res => {
        this.setState({
          newTrackerId: res.data.newTrackerId,
          currency1Id: '',
          currency2Id: ''
        });
      });
  };

  handleAlertLevelSubmission = () => {
    this.closeAlertLevelDialog();
    const { newTrackerId, alertLevel } = this.state;
    axios.post(`http://localhost:5000/api/tracker/${newTrackerId}/level/new`, {
      alertLevel: parseFloat(alertLevel)
    })
      .then(res => {
        console.log(res.data);
        this.fetchTrackersData();
      });
  };

  handleAlert

  render() {
    const { trackers, currencyDialogOpen, levelDialogOpen, currency1Id, currency2Id, alertLevelDialogOpen, newTrackerId, alertLevel } = this.state;
    return (
      <div>
        <NavBar />
        <Buttons
          type='add'
          buttonStyle={{ position: 'absolute', bottom: '8vh', right: '10vw', backgroundColor: '#247D96', zIndex: 2 }}
          iconStyle={{ color: 'white' }}
          openCurrencyDialog={this.openCurrencyDialog}
        />
        <TrackersSection trackers={trackers} fetchTrackersData={this.fetchTrackersData} />
        <AddCurrencyDialog
          currencyDialogOpen={currencyDialogOpen}
          closeCurrencyDialog={this.closeCurrencyDialog}
          openAlertLevelDialog={this.openAlertLevelDialog}
          currency1Id={currency1Id}
          currency2Id={currency2Id}
          handleCurrency1Selection={this.handleCurrency1Selection}
          handleCurrency2Selection={this.handleCurrency2Selection}
          handleCurrencyPageSubmission={this.handleCurrencyPageSubmission}
        />
        <SetAlertLevelDialog
          alertLevel={alertLevel}
          alertLevelDialogOpen={alertLevelDialogOpen}
          closeAlertLevelDialog={this.closeAlertLevelDialog}
          handleAlertLevelInput={this.handleAlertLevelInput}
          handleAlertLevelSubmission={this.handleAlertLevelSubmission}
        />
      </div>
    );
  }
}

export default App;
