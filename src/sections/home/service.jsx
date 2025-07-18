import React from 'react';

import { alpha, styled } from '@mui/material/styles';
import { Box, Grid, Stack, Paper, Container, Typography } from '@mui/material';

// Styled components using MUI's styled API
const BackgroundBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
  width: '100%',
  backgroundColor: '#f8f9fa',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' fill='%23f0f0f0'%3E%3Cpath d='M55.35,156.81c-5.89-11.49-1.75-25.92,9.7-31.89,7.29-3.81,16.01-3.39,22.89,1.04,2.76,1.77,5.13,4.13,6.99,6.88,1.12,1.66,2.04,3.46,2.73,5.33,0.45,1.22,0.82,2.47,1.11,3.74,0.22,0.95,0.39,1.91,0.52,2.88,0.08,0.64,0.15,1.29,0.19,1.94,0.03,0.44,0.05,0.89,0.06,1.33'/%3E%3C/svg%3E"),
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' fill='%23f0f0f0'%3E%3Cpath d='M155.35,56.81c5.89-11.49,1.75-25.92-9.7-31.89-7.29-3.81-16.01-3.39-22.89,1.04-2.76,1.77-5.13,4.13-6.99,6.88-1.12,1.66-2.04,3.46-2.73,5.33-0.45,1.22-0.82,2.47-1.11,3.74-0.22,0.95-0.39,1.91-0.52,2.88-0.08,0.64-0.15,1.29-0.19,1.94-0.03,0.44-0.05,0.89-0.06,1.33'/%3E%3C/svg%3E")
    `,
    backgroundPosition: '0% 0%, 100% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '600px 600px, 400px 400px',
    opacity: 0.3,
    zIndex: 0,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' fill='%23f5f5f5'%3E%3Cpath d='M95.35,126.81c-5.89-11.49-1.75-25.92,9.7-31.89,7.29-3.81,16.01-3.39,22.89,1.04,2.76,1.77,5.13,4.13,6.99,6.88'/%3E%3C/svg%3E"),
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' fill='%23f5f5f5'%3E%3Cpath d='M115.35,86.81c5.89-11.49,1.75-25.92-9.7-31.89-7.29-3.81-16.01-3.39-22.89,1.04-2.76,1.77-5.13,4.13-6.99,6.88'/%3E%3C/svg%3E")
    `,
    backgroundPosition: '100% 0%, 0% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '300px 300px, 500px 500px',
    opacity: 0.4,
    zIndex: 0,
  },
}));

const ServiceCard = styled(Paper)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(4),
  height: '100%',
  backgroundColor: alpha(theme.palette.background.paper, 0.8),
  backdropFilter: 'blur(8px)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
  },
  borderRadius: theme.spacing(3),
  overflow: 'hidden',
}));

const IconBox = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
}));

const ServicesSection = () => {
  const services = [
    {
      icon: '🧘‍♀️',
      title: 'Yoga',
      description:
        'Transform body and mind with our expert-led yoga sessions, suitable for all levels.',
      benefits: ['Improved flexibility and strength'],
    },
    {
      icon: '💪',
      title: 'Strength Training',
      description: 'Build strength and endurance with our comprehensive training programs.',
      benefits: ['Increased muscle strength', 'Improved metabolism'],
    },
    {
      icon: '❤️',
      title: 'Recovery & Wellness',
      description: 'Rejuvenate with our therapeutic massage and recovery services.',
      benefits: ['Faster muscle recovery'],
    },
  ];

  return (
    <BackgroundBox>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Stack spacing={6} py={8}>
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Typography variant="h3" component="h2" fontWeight="bold">
              Our Services
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 600 }}>
              Transform your mind, body, and soul with our comprehensive wellness offerings
            </Typography>
          </Stack>

          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} md={4} key={index}>
                <ServiceCard elevation={2}>
                  <IconBox>
                    <Typography variant="h4">{service.icon}</Typography>
                  </IconBox>
                  <Typography variant="h5" gutterBottom fontWeight="bold">
                    {service.title}
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    {service.description}
                  </Typography>
                  <Stack spacing={1}>
                    {service.benefits.map((benefit, idx) => (
                      <Stack key={idx} direction="row" spacing={1} alignItems="center">
                        <Box component="span" sx={{ color: 'primary.main' }}>
                          ✓
                        </Box>
                        <Typography color="text.secondary">{benefit}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </ServiceCard>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </BackgroundBox>
  );
};

export default ServicesSection;
