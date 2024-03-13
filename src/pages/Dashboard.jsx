import React, { useState, useEffect } from 'react';
import '../components/css/Dashboard.css';
import { HiOutlineArrowSmRight } from 'react-icons/hi';
import { FaUserCircle, FaBell } from 'react-icons/fa';
import Select from 'react-select';
import Calendar from 'react-calendar';
import { VscDebugStepOver } from 'react-icons/vsc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import 'react-calendar/dist/Calendar.css';
import SideBar from '../components/Sidebar/SideBar';
import { useNavigate } from 'react-router-dom';

// Dashboard component
const Dashboard = () => {
  const options = [
    { value: 'Brazil', label: 'Brazil' }
  ];

  // States for selected date, selected ship, calendar visibility, fuel data, and weather data
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedShip, setSelectedShip] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [fuelData, setFuelData] = useState([]);
  const [actualFuelData, setActualFuelData] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [headerInfo, setHeaderInfo] = useState({
    selectedShip: null,
    selectedDate: null,
  });

  // State to track whether the Save button has been clicked
  const [isSaveClicked, setIsSaveClicked] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  // Adding the new useEffect block
  useEffect(() => {
    fetchFuelAndWeatherData();
  }, [selectedShip, selectedDate]);

  // Function to fetch fuel and weather data from the backend
  const fetchFuelAndWeatherData = async () => {
    try {
      if (!selectedShip) {
        setFuelData([]);
        setActualFuelData([]);
        setWeatherData({});
        return;
      }

      const shipValue = selectedShip.value;
      const formattedDate = selectedDate ? selectedDate.toISOString().split('T')[0] : '';
      const url = `http://localhost:5000/api/auth/fetchFuelAndWeatherData?ship=${shipValue}&date=${formattedDate}`;

      const response = await fetch(url);
      const result = await response.json();

      console.log('Received data from backend:', result);

      setFuelData(result.fuelData || []);
      setActualFuelData(result.actualFuelData || []);
      setWeatherData(result.weatherData || {});
    } catch (error) {
      console.error('Error fetching fuel and weather data from backend:', error.message);
    }
  };

  // Function to customize tile content in the calendar based on weather data
  const tileContent = ({ date, view }) => {
    try {
      const dateString = date.toISOString().split('T')[0];
      const weatherCondition = weatherData.date[dateString];

      let color = '';
      if (weatherCondition === 'good') {
        color = 'green';
      } else if (weatherCondition === 'moderate') {
        color = 'orange';
      } else if (weatherCondition === 'bad') {
        color = 'red';
      }

      if (view === 'month') {
        return (
          <div
            style={{
              backgroundColor: color,
              width: '90%',
              height: '100%',
              borderRadius: '100%',
            }}
          />
        );
      }
    } catch (error) {
      console.error('Error in tileContent:', error.message);
    }

    return null;
  };

  // Styles for the dropdown
  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: '140px',
      fontSize: '16px',
    }),
    option: (provided) => ({
      ...provided,
      color: 'black',
    }),
  };

  // Function to toggle calendar visibility
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  // Function to handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  // Function to handle save button click
  const handleSaveButtonClick = () => {
    if (selectedShip && selectedDate) {
      setHeaderInfo({
        selectedShip: selectedShip.label,
        selectedDate: selectedDate.toDateString(),
      });
      setIsSaveClicked(true);
    }
  };

  // Return the JSX for the Dashboard component
  return (
    <div className="container">
      <div>
        <SideBar /> {/* Rendering the Sidebar component */}
      </div>
      <div>
        {/* Navbar section */}
        <div className="navbar">
          <div className="navbar-left">
            <span className="dashboard-title">Dashboard</span>
          </div>
          <div className="navbar-right">
            <span className="user-icon">
              <FaUserCircle />
            </span>
            <span className="alarm-icon">
              <FaBell />
            </span>
          </div>
        </div>

        {/* Dropdown and Calendar section */}
        <div className="navbar1">
          <div className="dropdown-container">
            <Select
              options={options}
              styles={customStyles}
              value={selectedShip}
              defaultValue={options[0]}
              onChange={(selectedOption) => setSelectedShip(selectedOption)}
            />
          </div>

          <div className="rightSection">
            <button onClick={toggleCalendar} className="custom-button">
              {selectedDate ? selectedDate.toDateString() : 'Calendar'}
            </button>
            {showCalendar && (
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                tileContent={tileContent}
              />
            )}
          </div>
          <button onClick={handleSaveButtonClick} className="saveButton">
            Save
          </button>
        </div>

        {/* Data display section */}
        <div className="navbar2">
          {/* Display predicted data */}
          {isSaveClicked && fuelData.length > 0 ? (
            fuelData.map((item, index) => (
              <div key={index} className="card">
                <label className="pre3">
                  Predicted And Actual Data Table According to Noon Report
                </label>
                <label className="pre1">
                  Predicted <HiOutlineArrowSmRight />
                </label>
                <h1 className="header">
                  {headerInfo.selectedShip || 'Select a Ship'}
                  <span className="date">{headerInfo.selectedDate || ''}</span>
                </h1>
                <p>
                  ME Fuel Cones <VscDebugStepOver />{' '}
                  <span style={{ color: 'lightblue' }}>
                    {selectedShip && selectedDate ? item.meFuelCones : 'N/A'}
                  </span>
                </p>
                <p>
                  AE Fuel Cones <VscDebugStepOver />
                  <span style={{ color: 'lightblue' }}>
                    {selectedShip && selectedDate ? item.aeFuelCones : 'N/A'}
                  </span>
                </p>
                <p>
                  ME RPM <VscDebugStepOver />{' '}
                  <span style={{ color: 'lightblue' }}>
                    {selectedShip && selectedDate ? item.meRPM : 'N/A'}
                  </span>
                </p>
                <p>
                  TC RPM <VscDebugStepOver />{' '}
                  <span style={{ color: 'lightblue' }}>
                    {selectedShip && selectedDate ? item.tcRPM : 'N/A'}
                  </span>
                </p>
              </div>
            ))
          ) : (
            <div key="default-card" className="card">
              <label className="pre3">
                Predicted And Actual Data Table According to Noon Report
              </label>
              <label className="pre1">
                Predicted <HiOutlineArrowSmRight />
              </label>
              <h1 className="header">
                {headerInfo.selectedShip || 'Select a Ship'}
                <span className="date">{headerInfo.selectedDate || ''}</span>
              </h1>
              <p>
                ME Fuel Cones <VscDebugStepOver /> N/A
              </p>
              <p>
                AE Fuel Cones <VscDebugStepOver /> N/A
              </p>
              <p>
                ME RPM <VscDebugStepOver /> N/A
              </p>
              <p>
                TC RPM <VscDebugStepOver /> N/A
              </p>
            </div>
          )}

          {/* Display actual data */}
          {isSaveClicked && actualFuelData.length > 0 ? (
            actualFuelData.map((item, index) => (
              <div key={index} className="card">
                <label className="pre2">
                  Actual <HiOutlineArrowSmRight />{' '}
                </label>
                <svg style={{ position: 'absolute', top: '-16%', left: '97%', transform: 'translate(-50%, -50%)' }}>
                  {/* Original path with arrow on one end */}
                  <path
                    className="flow-animation"
                    d="M20 54 Q50 20, 70 15 T130 63"
                    stroke="blue"
                    fill="transparent"
                    marker-start="url(#arrow-reverse)"
                    marker-mid="url(#arrow-reverse)"
                    marker-end="url(#arrow-reverse)"
                    transform="rotate(90 120 110)"
                  />
                  <path
                    className="flow-animation"
                    d="M20 54 Q50 20, 70 15 T130 63"
                    stroke="gray"
                    fill="transparent"
                    marker-start="url(#arrow-reverse)"
                    marker-mid="url(#arrow-reverse)"
                    marker-end="url(#arrow-reverse)"
                    transform="rotate(90 120 110)"
                  />

                  {/* Line below the original path */}
                  <path
                    d="0M20 54 Q50 20, 70 15 T130 63"
                    stroke="green"
                    strokeOpacity="0.07"
                    fill="transparent"
                    transform="rotate(90 120 110)"
                  />
                  {/* Arrowhead definition */}
                  <defs>
                    <marker
                      id="arrow-reverse"
                      markerWidth="5%"
                      markerHeight="16%"
                      refX="2%"
                      refY="7%"
                      orient="auto"
                      markerUnits="userSpaceOnUse"
                    >
                      <path
                        d="M90,0 L20,20 L5,9.6 Z"
                        fill="grey"
                        className="arrowhead-animation"
                      />
                    </marker>
                  </defs>
                </svg>
                <h1 className="header">
                  {headerInfo.selectedShip || 'Select a Ship'}
                  <span className="date">{headerInfo.selectedDate || ''}</span>
                </h1>
                <p>
                  ME Fuel Cones <FontAwesomeIcon icon={faArrowRight} />{' '}
                  <span style={{ color: 'lightblue' }}>
                    {selectedShip && selectedDate ? item.meFuelCones : 'N/A'}
                  </span>
                </p>
                <p>
                  AE Fuel Cones <FontAwesomeIcon icon={faArrowRight} />{' '}
                  <span style={{ color: 'lightblue' }}>
                    {selectedShip && selectedDate ? item.aeFuelCones : 'N/A'}
                  </span>
                </p>
                <p>
                  ME RPM <FontAwesomeIcon icon={faArrowRight} />{' '}
                  <span style={{ color: 'lightblue' }}>
                    {selectedShip && selectedDate ? item.meRPM : 'N/A'}
                  </span>
                </p>
                <p>
                  TC RPM <FontAwesomeIcon icon={faArrowRight} />{' '}
                  <span style={{ color: 'lightblue' }}>
                    {selectedShip && selectedDate ? item.tcRPM : 'N/A'}
                  </span>
                </p>
              </div>
            ))
          ) : (
            <div key="default-actual-card" className="card">
              <label className="pre2">
                Actual <HiOutlineArrowSmRight />{' '}
              </label>
              <h1 className="header">
                {headerInfo.selectedShip || 'Select a Ship'}
                <span className="date">{headerInfo.selectedDate || ''}</span>
              </h1>
              <p>
                ME Fuel Cones <FontAwesomeIcon icon={faArrowRight} /> N/A
              </p>
              <p>
                AE Fuel Cones <FontAwesomeIcon icon={faArrowRight} /> N/A
              </p>
              <p>
                ME RPM <FontAwesomeIcon icon={faArrowRight} /> N/A
              </p>
              <p>
                TC RPM <FontAwesomeIcon icon={faArrowRight} /> N/A
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
