import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';


const Buttons = (props) => {
  const { type, buttonStyle, iconStyle, openCurrencyDialog } = props;
  if (type === 'add') {
    return (
      <Button variant='fab' style={buttonStyle} onClick={openCurrencyDialog}>
        <AddIcon style={iconStyle} />
      </Button>
    );
  }
}

export default Buttons;