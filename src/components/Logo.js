import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {
  const mainStyle = { width: 'inherit', height: 'inherit', position: 'relative', backgroundColor: 'transperant' };
  const svgStyle = { fill: 'none', stroke: 'black', strokeWidth: 1 };

  const logo = (
    <Box sx={{ width: 50, height: 60, ...sx }}>
      <div style={mainStyle}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={svgStyle}>
          <polygon points="0,0 100,100 0,100 100,0 100,100 0,100 0,0 100,0" />
        </svg>
      </div>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}