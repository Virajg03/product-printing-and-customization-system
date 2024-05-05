import { Grid, Link, Typography, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Grid className='bg-darkBlue text-white mt-10 text-center' container sx={{ bgcolor: 'darkBlue', color: 'white', py: 3 }}>
      <Grid item xs={12} sm={6} md={3}>
        {/* Your existing content */}
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        {/* Your existing content */}
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        {/* Your existing content */}
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        {/* Your existing content */}
      </Grid>
      <Grid className='pt-20' item xs={12}>
        <Typography variant="body2" component="p" align="center">
          &copy; 2023 My Company. All rights reserved.
        </Typography>
        <Typography variant="body2" component="p" align="center">
          Made with love by Me.
        </Typography>
        <Typography variant="body2" component="p" align="center">
          Icons made by{' '}
          <Link href="https://www.freepik.com" color="inherit" underline="always">
            Freepik
          </Link>{' '}
          from{' '}
          <Link href="https://www.flaticon.com/" color="inherit" underline="always">
            www.flaticon.com
          </Link>
        </Typography>
        <div style={{ marginTop: '20px' }}>
          <IconButton style={{ color: '#3b5998' }} href="https://www.facebook.com">
            <Facebook />
          </IconButton>
          <IconButton style={{ color: '#1da1f2' }} href="https://twitter.com">
            <Twitter />
          </IconButton>
          <IconButton style={{ color: '#c32aa3' }} href="https://www.instagram.com">
            <Instagram />
          </IconButton>
          <IconButton style={{ color: '#0077b5' }} href="https://www.linkedin.com">
            <LinkedIn />
          </IconButton>
        </div>
      </Grid>
    </Grid>
  );
};

export default Footer;
