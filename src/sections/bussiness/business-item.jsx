import React from 'react';

import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import {
  Box,
  Card,
  Chip,
  Link,
  Stack,
  Button,
  styled,
  CardMedia,
  Typography,
  IconButton,
  CardContent,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const SocialButton = styled(IconButton)(({ theme, color }) => ({
  backgroundColor: color,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: color,
    opacity: 0.9,
  },
  marginLeft: theme.spacing(1),
}));

export default function BusinessItem({ business }) {
  const {
    business_name,
    owner_name,
    email,
    mobile_phone,
    whatsapp_group_link,
    instagram_handle,
    website,
    business_photos,
    is_verified,
    category,
    description,
    special_offers,
    tags,
    areas_served_cities,
    areas_served_zipcodes,
    category_fields,
  } = business;

  const coverPhoto = business_photos[0];
  const linkTo = paths.bussiness.details(business?.id);

  return (
    <StyledCard>
      <Box sx={{ position: 'relative' }}>
        <CardMedia component="img" height="240" image={coverPhoto} alt={business_name} />

        {is_verified && (
          <Chip
            label="Verified"
            color="primary"
            size="small"
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
            }}
          />
        )}

        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
          }}
        >
          {whatsapp_group_link && (
            <SocialButton
              size="small"
              color="#25D366"
              aria-label="whatsapp"
              onClick={() => window.open(whatsapp_group_link, '_blank')}
            >
              <WhatsAppIcon />
            </SocialButton>
          )}

          {instagram_handle && (
            <SocialButton
              size="small"
              color="#E4405F"
              aria-label="instagram"
              onClick={() => window.open(`https://instagram.com/${instagram_handle}`, '_blank')}
            >
              <InstagramIcon />
            </SocialButton>
          )}
        </Stack>
      </Box>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box>
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
            {business?.business_name}
          </Link>
          <Typography variant="body2" color="text.secondary">
            Owned by {owner_name}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {description?.split('\n')[0]}
        </Typography>
        {/* <Box>
          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            <AccessTimeIcon fontSize="small" color="action" />
            <Typography variant="subtitle2">Business Hours</Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Mon-Fri: {hours?.monday?.open} - {hours?.monday?.close}
            <br />
            Sat:{' '}
            {hours?.saturday.open === 'closed'
              ? 'Closed'
              : `${hours?.saturday?.open} - ${hours?.saturday?.close}`}
          </Typography>
        </Box> */}

        {/* {special_offers && (
          <Box sx={{ bgcolor: 'warning.lighter', p: 2, borderRadius: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <LocalOfferIcon fontSize="small" color="warning" />
              <Typography variant="body2" color="warning.darker">
                {special_offers}
              </Typography>
            </Stack>
          </Box>
        )} */}

        <Button
          variant="contained"
          startIcon={<PhoneIcon />}
          fullWidth
          sx={{ mt: 'auto' }}
          // onClick={() => window.location.href = `tel:${mobile_phone}`}
        >
          {mobile_phone}
        </Button>
      </CardContent>
    </StyledCard>
  );
}
