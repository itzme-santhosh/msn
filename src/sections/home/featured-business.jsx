import React from 'react';

import { Box, Link, Card, Stack, Button, Container, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';
import { Carousel, useCarousel, CarouselArrowBasicButtons } from 'src/components/carousel';

export function FeaturedBusiness({ title = 'Featured Businesses', list, sx, ...other }) {
  const carousel = useCarousel({
    align: 'start',
    slideSpacing: '24px',
    slidesToShow: { xs: 1, sm: 2, md: 3, lg: '35%', xl: '25%' },
  });

  return (
    <Container>
      <Box sx={{ ...sx }} {...other}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: { xs: 2, md: 3 } }}
        >
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <CarouselArrowBasicButtons {...carousel.arrows} />
        </Stack>

        <Carousel
          carousel={carousel}
          slotProps={{
            slide: { py: 3 },
          }}
          sx={{ px: 0.5 }}
        >
          {list.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </Carousel>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1, mb: 2 }}>
          <Button
            component={RouterLink}
            href={paths.bussiness.root}
            size="large"
            variant="outlined"
            endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
            sx={{
              borderRadius: 1,
              textTransform: 'none',
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
              },
            }}
          >
            View All Businesses
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

function BusinessCard({ business }) {
  const linkTo = paths.bussiness.details(business?.id);

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        transition: 'transform 0.2s ease-in-out',
        boxShadow: (theme) => theme.shadows[1],
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => theme.shadows[10],
        },
      }}
    >
      <Box sx={{ position: 'relative', pt: '70%' }}>
        {business.business_photos?.length > 0 ? (
          <Box
            component="img"
            src={business.business_photos[0]}
            alt={business.business_name}
            sx={{
              top: 0,
              width: 1,
              height: 1,
              objectFit: 'cover',
              position: 'absolute',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          />
        ) : (
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
              top: 0,
              width: 1,
              height: 1,
              position: 'absolute',
              bgcolor: 'background.neutral',
            }}
          >
            <Iconify
              icon="solar:camera-minimalistic-broken"
              width={40}
              sx={{ color: 'text.disabled' }}
            />
          </Stack>
        )}
      </Box>

      <Stack spacing={2} sx={{ p: 3, flexGrow: 1 }}>
        <Link
          component={RouterLink}
          href={linkTo}
          color="inherit"
          variant="subtitle1"
          sx={{
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            textDecoration: 'none',
            '&:hover': { color: 'primary.main' },
          }}
        >
          {business.business_name}
        </Link>

        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Owner
            </Typography>
            <Typography variant="subtitle2" noWrap>
              {business.owner_name || 'N/A'}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Contact
            </Typography>
            <Typography variant="subtitle2" noWrap>
              {business.mobile_phone || 'N/A'}
            </Typography>
          </Stack>
        </Stack>

        <Button
          fullWidth
          variant="contained"
          component={RouterLink}
          href={linkTo}
          sx={{
            mt: 'auto',
            bgcolor: 'success.main',
            borderRadius: 1,
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': {
              bgcolor: 'success.dark',
            },
          }}
        >
          Book Now
        </Button>
      </Stack>
    </Card>
  );
}
