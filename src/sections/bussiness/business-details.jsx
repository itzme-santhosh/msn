import React from 'react';

import { Box, Link, Stack, Button, Avatar, Divider, Typography } from '@mui/material';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function BusinessDetailsSummary({ business }) {
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

  const renderPhoto = (
    <Box sx={{ textAlign: 'center', mb: 2 }}>
      {business_photos && business_photos.length > 0 ? (
        <Avatar
          src={business_photos[0]} // Show first image
          alt={business_name}
          variant="square"
          sx={{ width: 200, height: 200, mx: 'auto', borderRadius: 2 }}
        />
      ) : (
        <Typography variant="caption" color="text.secondary">
          No image available
        </Typography>
      )}
    </Box>
  );

  const renderBusinessName = (
    <Typography variant="h4" fontWeight="bold" sx={{ textAlign: 'center', mb: 2 }}>
      {business_name || 'Unknown Business'}
    </Typography>
  );

  const renderOwnerDetails = (
    <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ mb: 2 }}>
      <Box>
        <Typography variant="subtitle2">Owner</Typography>
        <Typography variant="body2" noWrap>
          {owner_name || 'N/A'}
        </Typography>
      </Box>
      <Box>
        <Typography variant="subtitle2">Mobile</Typography>
        <Typography variant="body2" noWrap>
          {mobile_phone || 'N/A'}
        </Typography>
      </Box>
    </Stack>
  );

  const renderContactDetails = (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Contact Information
      </Typography>
      <Stack spacing={1.5}>
        <Box>
          <Typography component="span" variant="body2" fontWeight="medium">
            Email:
          </Typography>
          <Typography component="span" variant="body2">
            {email || 'N/A'}
          </Typography>
        </Box>
        <Box>
          <Typography component="span" variant="body2" fontWeight="medium">
            WhatsApp:
          </Typography>
          <Typography component="span" variant="body2">
            {whatsapp_group_link || 'N/A'}
          </Typography>
        </Box>
        <Box>
          <Typography component="span" variant="body2" fontWeight="medium">
            Instagram:
          </Typography>
          <Typography component="span" variant="body2">
            {instagram_handle || 'N/A'}
          </Typography>
        </Box>
        <Box>
          <Typography component="span" variant="body2" fontWeight="medium">
            Website:
          </Typography>
          {website ? (
            <Link
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              variant="body2"
              sx={{ ml: 0.5 }}
            >
              {website}
            </Link>
          ) : (
            <Typography component="span" variant="body2">
              N/A
            </Typography>
          )}
        </Box>
      </Stack>
    </Box>
  );

  const renderVerifiedBadge = is_verified && (
    <Box sx={{ textAlign: 'center', mb: 2 }}>
      <Typography
        variant="caption"
        sx={{ backgroundColor: 'success.light', px: 2, py: 1, borderRadius: 1 }}
      >
        Verified Business
      </Typography>
    </Box>
  );

  const renderActions = (
    <Stack direction="row" spacing={2}>
      <Button
        fullWidth
        size="large"
        color="warning"
        variant="contained"
        startIcon={<Iconify icon="solar:cart-plus-bold" width={24} />}
        sx={{ whiteSpace: 'nowrap' }}
      >
        Add to cart
      </Button>

      <Button fullWidth size="large" type="submit" variant="contained">
        Buy now
      </Button>
    </Stack>
  );

  const renderCategorySpecificDetails = () => {
    switch (category) {
      case 'Food':
        return (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Food Service Details
            </Typography>
            <Stack spacing={1.5}>
              {category_fields?.menu && (
                <Box>
                  <Typography variant="body2" fontWeight="medium">
                    Menu:
                  </Typography>
                  <Typography variant="body2">{category_fields.menu}</Typography>
                </Box>
              )}
              {category_fields?.food_pricing && (
                <Box>
                  <Typography variant="body2" fontWeight="medium">
                    Pricing:
                  </Typography>
                  <Typography variant="body2">{category_fields.food_pricing}</Typography>
                </Box>
              )}
              {category_fields?.delivery_pricing && (
                <Box>
                  <Typography variant="body2" fontWeight="medium">
                    Delivery Pricing:
                  </Typography>
                  <Typography variant="body2">{category_fields.delivery_pricing}</Typography>
                </Box>
              )}
            </Stack>
          </Box>
        );

      case 'Kids':
        return (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Kids Service Details
            </Typography>
            <Stack spacing={1.5}>
              {category_fields?.age_range && (
                <Box>
                  <Typography variant="body2" fontWeight="medium">
                    Age Range:
                  </Typography>
                  <Typography variant="body2">{category_fields.age_range}</Typography>
                </Box>
              )}
              {category_fields?.activity_type && (
                <Box>
                  <Typography variant="body2" fontWeight="medium">
                    Activity Type:
                  </Typography>
                  <Typography variant="body2">{category_fields.activity_type}</Typography>
                </Box>
              )}
            </Stack>
          </Box>
        );

      case 'Home':
        return (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Home Service Details
            </Typography>
            <Stack spacing={1.5}>
              {category_fields?.service_type && (
                <Box>
                  <Typography variant="body2" fontWeight="medium">
                    Service Type:
                  </Typography>
                  <Typography variant="body2">{category_fields.service_type}</Typography>
                </Box>
              )}
              {category_fields?.insured !== undefined && (
                <Box>
                  <Typography variant="body2" fontWeight="medium">
                    Insured:
                  </Typography>
                  <Typography variant="body2">{category_fields.insured ? 'Yes' : 'No'}</Typography>
                </Box>
              )}
            </Stack>
          </Box>
        );

      case 'Finance':
        return (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Financial Service Details
            </Typography>
            <Stack spacing={1.5}>
              {category_fields?.minimum_investment && (
                <Box>
                  <Typography variant="body2" fontWeight="medium">
                    Minimum Investment:
                  </Typography>
                  <Typography variant="body2">${category_fields.minimum_investment}</Typography>
                </Box>
              )}
              {category_fields?.certifications && (
                <Box>
                  <Typography variant="body2" fontWeight="medium">
                    Certifications:
                  </Typography>
                  <Typography variant="body2">{category_fields.certifications}</Typography>
                </Box>
              )}
            </Stack>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 600,
        mx: 'auto',
        backgroundColor: 'white',
      }}
    >
      {renderPhoto}
      {renderBusinessName}
      {renderVerifiedBadge}
      <Divider sx={{ borderStyle: 'dashed', mb: 3 }} />
      {renderOwnerDetails}
      <Divider sx={{ borderStyle: 'dashed', mb: 3 }} />
      {renderContactDetails}
      <Divider sx={{ borderStyle: 'dashed', mb: 3 }} />
      {renderCategorySpecificDetails()}
      <Divider sx={{ borderStyle: 'dashed', mb: 3 }} />
      {renderActions}
    </Box>
  );
}
