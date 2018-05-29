import React, { Component } from 'react';
import NavBar from './NavBar/NavBar';
import Buttons from './Buttons/Buttons';
import TrackersSection from './TrackersSection/TrackersSection';
import axios from 'axios';
import AddCurrencyDialog from './Dialogs/AddCurrencyDialog';
import SetAlertLevelDialog from './Dialogs/SetAlertLevelDialog';

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

  openDialogs = name => () => {
    this.setState({
      [name]: true
    });
  };

  closeDialogs = name => () => {
    this.setState({
      [name]: false
    });
  };

  handleCurrencySelection = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };


  handleAlertLevelInput = event => {
    this.setState({
      alertLevel: event.target.value
    });
  };

  handleCurrencyPageSubmission = () => {
    this.closeDialogs('currencyDialogOpen')();
    this.openDialogs('alertLevelDialogOpen')();
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
    this.closeDialogs('alertLevelDialogOpen')();
    const { newTrackerId, alertLevel } = this.state;
    axios.post(`http://localhost:5000/api/tracker/${newTrackerId}/level/new`, {
      alertLevel: parseFloat(alertLevel)
    })
      .then(res => {
        console.log(res.data);
        this.fetchTrackersData();
      });
  };

  render() {
    const { trackers, currencyDialogOpen, currency1Id, currency2Id, alertLevelDialogOpen, alertLevel } = this.state;
    return (
      <div>
        <NavBar />
        <Buttons
          type='add'
          buttonStyle={{ position: 'absolute', bottom: '8vh', right: '10vw', backgroundColor: '#247D96', zIndex: 2 }}
          iconStyle={{ color: 'white' }}
          openCurrencyDialog={this.openDialogs('currencyDialogOpen')}
        />
        <TrackersSection trackers={trackers} fetchTrackersData={this.fetchTrackersData} />
        <AddCurrencyDialog
          currencyDialogOpen={currencyDialogOpen}
          closeCurrencyDialog={this.closeDialogs('currencyDialogOpen')}
          openAlertLevelDialog={this.openDialogs('alertLevelDialogOpen')}
          currency1Id={currency1Id}
          currency2Id={currency2Id}
          handleCurrency1Selection={this.handleCurrencySelection('currency1Id')}
          handleCurrency2Selection={this.handleCurrencySelection('currency2Id')}
          handleCurrencyPageSubmission={this.handleCurrencyPageSubmission}
        />
        <SetAlertLevelDialog
          alertLevel={alertLevel}
          alertLevelDialogOpen={alertLevelDialogOpen}
          closeAlertLevelDialog={this.closeDialogs('alertLevelDialogOpen')}
          handleAlertLevelInput={this.handleAlertLevelInput}
          handleAlertLevelSubmission={this.handleAlertLevelSubmission}
        />
      </div>
    );
  }
}

export default App;
