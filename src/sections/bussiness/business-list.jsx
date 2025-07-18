import React, { useState } from 'react';

import {
  Box,
  Grid,
  Stack,
  Paper,
  Select,
  Button,
  MenuItem,
  useTheme,
  Container,
  Typography,
  Pagination,
  InputLabel,
  FormControl,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';

import { useGetGuestmsnProducts } from 'src/actions/product';

import BusinessItem from './business-item';

const CATEGORIES = [
  { value: '', label: 'All Categories' },
  { value: 'Food', label: 'Food' },
  { value: 'Kids', label: 'Kids' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Home', label: 'Home' },
];

const BusinessList = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [category, setCategory] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const { products, productsLoading } = useGetGuestmsnProducts(page, pageSize, category);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setPage(1);
  };

  const handleReset = () => {
    setCategory('');
    setPage(1);
    setPageSize(12);
  };

  if (productsLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
          width: '100%',
        }}
      >
        <CircularProgress size={isMobile ? 40 : 48} />
      </Box>
    );
  }

  const businesses = products?.data || [];
  const totalPages = Math.ceil((products?.total || 0) / pageSize);

  if (businesses.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            bgcolor: 'background.default',
            borderRadius: 2,
          }}
        >
          <Stack spacing={3} alignItems="center">
            <Typography
              variant={isMobile ? 'h6' : 'h5'}
              color="text.secondary"
              sx={{ textAlign: 'center' }}
            >
              {category
                ? `No businesses available in the ${CATEGORIES.find((c) => c.value === category)?.label} category.`
                : 'No businesses available at the moment.'}
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleReset}
                sx={{
                  px: { xs: 3, sm: 4 },
                  py: { xs: 1, sm: 1.5 },
                }}
              >
                Reset Filters
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Stack spacing={{ xs: 3, sm: 4, md: 5 }} sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
        {/* Category Filter */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3 },
            bgcolor: 'background.default',
            borderRadius: 2,
          }}
        >
          <FormControl
            fullWidth
            size={isMobile ? 'small' : 'medium'}
            sx={{ maxWidth: { sm: 240 } }}
          >
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={handleCategoryChange}
              label="Category"
              variant="outlined"
            >
              {CATEGORIES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>

        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ minHeight: '60vh' }}>
          {businesses.map((business) => (
            <Grid item xs={12} sm={6} md={4} key={business.id}>
              <BusinessItem business={business} />
            </Grid>
          ))}
        </Grid>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3 },
            bgcolor: 'background.default',
            borderRadius: 2,
            mt: { xs: 3, sm: 4 },
          }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            spacing={{ xs: 2, sm: 3 }}
          >
            <FormControl
              size={isMobile ? 'small' : 'medium'}
              sx={{
                minWidth: { xs: '100%', sm: 120 },
                '& .MuiSelect-select': {
                  py: { xs: 1, sm: 1.5 },
                },
              }}
            >
              <Select value={pageSize} onChange={handlePageSizeChange} variant="outlined">
                <MenuItem value={12}>12 per page</MenuItem>
                <MenuItem value={24}>24 per page</MenuItem>
                <MenuItem value={48}>48 per page</MenuItem>
              </Select>
            </FormControl>

            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size={isMobile ? 'small' : 'medium'}
              showFirstButton
              showLastButton
              siblingCount={isMobile ? 0 : 1}
              sx={{
                '& .MuiPagination-ul': {
                  justifyContent: 'center',
                },
                '& .MuiPaginationItem-root': {
                  mx: { xs: 0.25, sm: 0.5 },
                },
              }}
            />
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};

export default BusinessList;
