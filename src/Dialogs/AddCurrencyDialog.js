import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
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
`

class AddCurrencyDialog extends Component {
  state = {
    currencies: []
  };

  componentDidMount() {
    this.fetchCurrenciesData();
  }

  fetchCurrenciesData = () => {
    axios.get('http://localhost:5000/api/currency')
      .then(res => {
        this.setState({
          currencies: res.data
        });
      });
  }

  render() {
    const { currencyDialogOpen, closeCurrencyDialog, currency1Id, currency2Id, handleCurrency1Selection, handleCurrency2Selection, handleCurrencyPageSubmission } = this.props;
    const { currencies } = this.state;
    const renderMenuItems = currencies && currencies.map(currency => {
      return (
        <MenuItem value={currency.id} key={currency.id}>{currency.name}</MenuItem>
      )
    });
    return (
      <Dialog
        fullScreen
        open={currencyDialogOpen}
        onClose={closeCurrencyDialog}
        TransitionComponent={Transitions}
      >
        <AppBar style={{ backgroundColor: 'white', boxShadow: 'none' }}>
          <Toolbar>
            <IconButton onClick={closeCurrencyDialog} aria-label='Close'>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <StyledForm>
          <FormControl style={{ margin: '20px 20px' }}>
            <InputLabel>Currency 1</InputLabel>
            <Select
              value={currency1Id}
              onChange={handleCurrency1Selection}

            >
              {renderMenuItems}
            </Select>
          </FormControl>
          <FormControl style={{ margin: '20px 20px' }}>
            <InputLabel>Currency 2</InputLabel>
            <Select
              value={currency2Id}
              onChange={handleCurrency2Selection}

            >
              {renderMenuItems}
            </Select>
          </FormControl>
          <Button onClick={handleCurrencyPageSubmission} style={{ backgroundColor: '#247D96', color: 'white', width: '50%', alignSelf: 'center' }}>Next</Button>
        </StyledForm>
      </Dialog>
    )
  }
}

export default AddCurrencyDialog;
