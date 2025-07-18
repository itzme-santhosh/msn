import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/config-global';
import { varAlpha, stylesMode } from 'src/theme/styles';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export const FEATURES = [
  {
    label: 'Community Connections',
    description: 'Connect with like-minded individuals and groups in Texas.',
  },
  { label: 'Buy & Sell Easily', description: 'Post or find items for sale with ease.' },
  {
    label: 'Job Opportunities',
    description: 'Explore job openings tailored for the Desi community.',
  },
];

// ----------------------------------------------------------------------

export function AboutWhat({ sx, ...other }) {
  return (
    <Box component="section" sx={{ overflow: 'hidden', ...sx }} {...other}>
      <Container
        component={MotionViewport}
        sx={{
          py: { xs: 10, md: 15 },
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        <Grid container columnSpacing={{ md: 3 }} alignItems="flex-start">
          <Grid
            container
            xs={12}
            md={6}
            lg={7}
            alignItems="center"
            sx={{
              pr: { md: 7 },
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <Grid xs={6}>
              <m.div variants={varFade().inUp}>
                <Image
                  alt="Community connection small"
                  src={`${CONFIG.assetsDir}/assets/images/about/what-small.webp`}
                  ratio="1/1"
                  sx={(theme) => ({
                    borderRadius: 3,
                    boxShadow: `-40px 40px 80px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.24)}`,
                    [stylesMode.dark]: {
                      boxShadow: `-40px 40px 80px ${varAlpha(theme.vars.palette.common.blackChannel, 0.24)}`,
                    },
                  })}
                />
              </m.div>
            </Grid>

            <Grid xs={6}>
              <m.div variants={varFade().inUp}>
                <Image
                  alt="Community connection large"
                  src={`${CONFIG.assetsDir}/assets/images/about/what-large.webp`}
                  ratio="3/4"
                  sx={(theme) => ({
                    borderRadius: 3,
                    boxShadow: `-40px 40px 80px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.24)}`,
                    [stylesMode.dark]: {
                      boxShadow: `-40px 40px 80px ${varAlpha(theme.vars.palette.common.blackChannel, 0.24)}`,
                    },
                  })}
                />
              </m.div>
            </Grid>
          </Grid>

          <Grid xs={12} md={6} lg={5}>
            <m.div variants={varFade().inRight}>
              <Typography variant="h2" sx={{ mb: 3 }}>
                What is MSNGroup?
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              <Typography
                sx={{ color: 'text.secondary', [stylesMode.dark]: { color: 'common.white' } }}
              >
                MSNGroup is the ultimate platform for Desi Indians living in Texas, USA. Whether
                you&apos;re looking to buy or sell items, find housing, connect with your local
                community, or explore job opportunities, we have you covered. We aim to bring the
                community together through our user-friendly platform, designed to meet the unique
                needs of our users.
              </Typography>
            </m.div>

            <Box gap={3} display="flex" flexDirection="column" sx={{ my: 5 }}>
              {FEATURES.map((feature, index) => (
                <Box component={m.div} key={feature.label} variants={varFade().inRight}>
                  <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.primary' }}>
                    {feature.label}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {feature.description}
                  </Typography>
                </Box>
              ))}
            </Box>

            <m.div variants={varFade().inRight}>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
              >
                Learn More
              </Button>
            </m.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
