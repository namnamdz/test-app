// THIRD-PARTY
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import ImgLogo from 'assets/images/logo.png';

const Logo = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ marginLeft: 5 , display: 'flex'}}>
      <img src={ImgLogo} alt="Logo" style={{ marginRight: matchDownSM ? 8 : 16, marginBottom: 16}} />
    </Box>
  );
};

export default Logo;
