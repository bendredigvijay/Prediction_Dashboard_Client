import React from 'react';
import { AppBar, Toolbar, Button, Menu, MenuItem } from '@mui/material';
import Select from 'react-select';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CustomNavbar = ({
  options,
  customStyles,
  selectedShip,
  setSelectedShip,
  selectedDate,
  toggleCalendar,
  showCalendar,
  handleDateChange,
  handleSaveButtonClick
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Select
          options={options}
          styles={customStyles}
          value={selectedShip}
          defaultValue={options[0]}
          onChange={(selectedOption) => setSelectedShip(selectedOption)}
        />

        <Button onClick={toggleCalendar} color="inherit">
          {selectedDate ? selectedDate.toDateString() : 'Calendar'}
        </Button>
        {showCalendar && (
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
          />
        )}

        <Button onClick={handleSaveButtonClick} color="inherit">Save</Button>
        
      </Toolbar>
    </AppBar>
  );
};

export default CustomNavbar;
