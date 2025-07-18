import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ProductDetailsSkeleton } from 'src/sections/product/product-skeleton';
import { ProductDetailsCarousel } from 'src/sections/product/product-details-carousel';

import { BusinessDetailsSummary } from '../business-details';

// ----------------------------------------------------------------------

const SUMMARY = [
  {
    title: 'Verified Listings',
    description: 'Find trusted and verified postings for products and services.',
    icon: 'solar:verified-check-bold',
  },
  {
    title: 'Quick Response',
    description: 'Get responses from sellers and buyers within minutes.',
    icon: 'solar:clock-circle-bold',
  },
  {
    title: 'Wide Range of Categories',
    description: 'Explore listings from jobs, housing, services, to items for sale.',
    icon: 'solar:shield-check-bold',
  },
];

// ----------------------------------------------------------------------

export function MSNProductSDetailsView({ product, error, loading }) {
  if (loading) {
    return (
      <Container sx={{ mt: 5, mb: 10 }}>
        <ProductDetailsSkeleton />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 5, mb: 10 }}>
        <EmptyContent
          filled
          title="Product not found!"
          action={
            <Button
              component={RouterLink}
              href={paths.product.root}
              startIcon={<Iconify width={16} icon="eva:arrow-ios-back-fill" />}
              sx={{ mt: 3 }}
            >
              Back to list
            </Button>
          }
          sx={{ py: 10 }}
        />
      </Container>
    );
  }
  return (
    <Container sx={{ mt: 5, mb: 10 }}>
      <CustomBreadcrumbs
        links={[
          { name: 'Home', href: '/' },
          { name: 'Business', href: paths.bussiness.root },
          { name: product?.business_name },
        ]}
        sx={{ mb: 5 }}
      />

      <Grid container spacing={{ xs: 3, md: 5, lg: 8 }}>
        <Grid xs={12} md={6} lg={7}>
          <ProductDetailsCarousel images={product?.business_photos} />
        </Grid>

        <Grid xs={12} md={6} lg={5}>
          {product && <BusinessDetailsSummary business={product} />}
        </Grid>
      </Grid>

      <Box
        gap={5}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
        sx={{ my: 10 }}
      >
        {SUMMARY.map((item) => (
          <Box key={item.title} sx={{ textAlign: 'center', px: 5 }}>
            <Iconify icon={item.icon} width={32} sx={{ color: 'primary.main' }} />

            <Typography variant="subtitle1" sx={{ mb: 1, mt: 2 }}>
              {item.title}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
