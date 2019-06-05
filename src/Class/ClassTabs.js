import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ParticipantList from "./ParticipantList.js"

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};



function ClassTabs(props) {
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="תאריך ושעה"  />
          <Tab label="כל המשתתפים"  />
          <Tab label="קצת על הקורס"  />
        </Tabs>
      </AppBar>
      {value === 0 && <TabContainer><p>הקורס יתקיים בימי שני החל מה30 ביוני ועד ה4 בספטמבר</p></TabContainer>}
      {value === 1 && <TabContainer><ParticipantList list = {props.list} manager = {props.manager}/></TabContainer>}
      {value === 2 && <TabContainer><p>{props.description}</p></TabContainer>}
    </div>
  );
}

export default ClassTabs;

