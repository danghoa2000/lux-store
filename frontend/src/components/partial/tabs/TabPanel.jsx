import { Box, Typography } from '@mui/material';
import React from 'react';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      id={index}
      aria-labelledby={index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography wrapper="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export default TabPanel;