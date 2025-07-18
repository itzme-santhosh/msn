import React from 'react';

import { Box, Grid, Stack, Container, Typography } from '@mui/material';

import { CONFIG } from 'src/config-global';

import { Iconify } from 'src/components/iconify';

const services = [
  { icon: 'mdi:face-woman', title: "Women's Salon & Spa", color: '#FFB6C1', iconColor: '#C2185B' }, // Light Pink, Dark Pink Icon
  { icon: 'mdi:face-man', title: "Men's Salon & Massage", color: '#87CEEB', iconColor: '#0D47A1' }, // Light Blue, Dark Blue Icon
  {
    icon: 'mdi:air-conditioner',
    title: 'AC & Appliance Repair',
    color: '#ADD8E6',
    iconColor: '#01579B',
  }, // Light Cyan, Steel Blue Icon
  { icon: 'mdi:broom', title: 'Cleaning & Pest Control', color: '#98FB98', iconColor: '#388E3C' }, // Pale Green, Dark Green Icon
  {
    icon: 'mdi:tools',
    title: 'Electrician, Plumber & Carpenter',
    color: '#FFA500',
    iconColor: '#E65100',
  }, // Orange, Deep Orange Icon
  {
    icon: 'mdi:water-pump',
    title: 'Native Water Purifier',
    color: '#1E90FF',
    iconColor: '#0B3D91',
  }, // Dodger Blue, Navy Blue Icon
  {
    icon: 'mdi:format-paint',
    title: 'Rooms/walls painting',
    color: '#FFD700',
    iconColor: '#FF8F00',
  }, // Gold, Amber Icon
  { icon: 'mdi:wall', title: 'Wall Panels', color: '#A52A2A', iconColor: '#4E342E' }, // Brown, Dark Brown Icon
  // { icon: 'mdi:chevron-right', title: 'View More', color: 'background.paper', iconColor: 'text.secondary' }, // Black, Black Icon
];

const images = [
  `${CONFIG.assetsDir}/assets/images/services/saloon.jpg`,
  `${CONFIG.assetsDir}/assets/images/services/plumber.jpg`,
  `${CONFIG.assetsDir}/assets/images/services/ac-repair.jpg`,
  `${CONFIG.assetsDir}/assets/images/services/painter.jpg`,
];

export function HomeServices() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 5, md: 10 },
        px: { xs: 2, md: 0 },
        backgroundColor: 'background.default',
      }}
    >
      <Container>
        <Grid container spacing={5}>
          {/* Left Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom>
              Home services at your doorstep
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 4, color: 'text.secondary' }}>
              What are you looking for?
            </Typography>

            <Grid container spacing={3}>
              {services.map((service, index) => (
                <Grid key={index} item xs={6} sm={4}>
                  <Stack
                    spacing={1}
                    alignItems="center"
                    sx={{
                      textAlign: 'center',
                    }}
                  >
                    {/* Icon */}
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: '50%',
                        backgroundColor: service.color,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 70,
                        height: 70,
                      }}
                    >
                      <Iconify
                        icon={service.icon}
                        width={30}
                        height={30}
                        style={{ color: service.iconColor }}
                      />
                    </Box>
                    {/* Text */}
                    <Typography variant="body2" sx={{ fontWeight: 'medium', textAlign: 'center' }}>
                      {service.title}
                    </Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Right Section: Images */}
          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Grid container spacing={3}>
              {images.map((src, index) => (
                <Grid key={index} item xs={12} sm={6}>
                  <Box
                    component="img"
                    src={src}
                    alt={`Image ${index + 1}`}
                    sx={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: 3,
                      boxShadow: 4,
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
