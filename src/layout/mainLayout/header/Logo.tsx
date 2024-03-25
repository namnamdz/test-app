// THIRD-PARTY
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';

// PROJECT IMPORTS
import { DASHBOARD_PATH } from 'config';
import Logo from 'components/logo/logo'
const LogoSection = () => (
  <Link component={RouterLink} to={DASHBOARD_PATH}>
    <Logo />
  </Link>
);

export default LogoSection;
