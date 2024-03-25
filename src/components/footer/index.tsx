//THIRD-IMPORT
import React from "react";
import {
  Box,
  Grid,
  Link,
  Typography,
  Container,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import QRCode from "react-qr-code";
import { QrCode } from "@mui/icons-material";

//PROJECT-IMPORT

const socialMediaLinks = {
  facebook: "#",
  twitter: "#",
  instagram: "#",
};

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        color: "text.secondary",
        py: 3,
        borderTop: "1px solid",
        borderColor: "divider",
        marginTop: "auto",
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={6} sm={3} md={3}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              PRODUCT
            </Typography>
            <Link href="#" color="inherit" display="block">
              Features
            </Link>
            <Link href="#" color="inherit" display="block">
              Integrations
            </Link>
            <Link href="#" color="inherit" display="block">
              Pricing
            </Link>
            <Link href="#" color="inherit" display="block">
              FAQ
            </Link>
          </Grid>
          <Grid item xs={6} sm={3} md={3}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              COMPANY
            </Typography>
            <Link href="#" color="inherit" display="block">
              About Us
            </Link>
            <Link href="#" color="inherit" display="block">
              Careers
            </Link>
            <Link href="#" color="inherit" display="block">
              Privacy Policy
            </Link>
            <Link href="#" color="inherit" display="block">
              Terms of Service
            </Link>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              SOCIAL MEDIA
            </Typography>
            <IconButton
              aria-label="Facebook"
              color="inherit"
              component="a"
              href={socialMediaLinks.facebook}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              aria-label="Twitter"
              color="inherit"
              component="a"
              href={socialMediaLinks.twitter}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              aria-label="Instagram"
              color="inherit"
              component="a"
              href={socialMediaLinks.instagram}
            >
              <InstagramIcon />
            </IconButton>
          </Grid>
          <Grid item xs={6} sm={3} md={3}>
            <QRCode value="https://chat.openai.com/c/c0aa49af-8477-4444-9ed2-df20eb8734af
            " />
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ pt: 4 }}
        >
          © 2024 Company Co. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
