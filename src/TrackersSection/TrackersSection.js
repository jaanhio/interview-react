import React, { Component } from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreOptionsIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import AlertLevelPanel from '../TrackerCards/AlertLevelPanel';

const TrackersSectionWrapper = styled.main`
  margin-top: 9vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DefaultSectionText = styled.h1`
  text-align: center;
  font-weight: 300;
`;

class TrackersSection extends Component {
  state = {
    currencyDialogOpen: false,
    levelDialogOpen: false,
    currency1Id: '',
    currency2Id: '',
    alertLevel: ''
  };

  render() {
    const { trackers, fetchTrackersData } = this.props;
    const renderTrackerCards = trackers && trackers.map((tracker, index) => {
      return (
        <Paper key={index} style={{ width: '90vw', marginTop: 10, marginBottom: 10 }}>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />} style={{ backgroundColor: '#247D96', color: 'white' }}>
              <div>
                {tracker.currency1Name} - {tracker.currency2Name}
              </div>
              <div style={{ marginLeft: 20 }}>
                {tracker.currentExchangeLevel}
              </div>
            </ExpansionPanelSummary>
            {tracker.alertLevels.map((alertLevel, index) => <AlertLevelPanel key={index} alertLevelDetails={alertLevel} fetchTrackersData={fetchTrackersData} />)}
          </ExpansionPanel>
        </Paper>
      )
    });
    return (
      <TrackersSectionWrapper>
        {trackers.length < 1 && <DefaultSectionText>Add Trackers to start tracking</DefaultSectionText>}
        {renderTrackerCards}
      </TrackersSectionWrapper>
    );
  }
}

export default TrackersSection;