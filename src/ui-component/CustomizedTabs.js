import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab/Tab';
import TabContext from '@mui/lab/TabContext/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel/TabPanel';

const CustomizedTabs = ({ tabLabel }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={value}>
        <Box sx={{ bgcolor: "#fff" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Item Zero" value="0" />
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
        </Box>
      <Box>
        <TabPanel value="0">Item One</TabPanel>
        <TabPanel value="1">Item Two</TabPanel>
        <TabPanel value="2">Item Three</TabPanel>
        <TabPanel value="3">Item foree</TabPanel>
      </Box>
      </TabContext>
    </Box>
  );
};
export default CustomizedTabs;
