import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import InputBase from '@mui/material/InputBase';
import { useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';

import { useDebounce } from 'src/hooks/use-debounce';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar'; // Ensure this is correctly implemented
import axios from 'axios';

import { Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { CONFIG } from 'src/config-global';

const backendAxiosInstance = axios.create({ baseURL: CONFIG.laravelServerUrl });

export function GlobalSearch({ sx, ...other }) {
  const theme = useTheme();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(searchQuery, 500); // Debounce the search query
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSearchQuery('');
    setBusinesses([]);
  };

  useEffect(() => {
    const fetchBusinesses = async () => {
      if (!debouncedQuery.trim()) {
        setBusinesses([]); // Clear results if query is empty
        return;
      }

      setLoading(true);
      try {
        const response = await backendAxiosInstance.get('/api/businesses', {
          params: { search: debouncedQuery },
        });
        setBusinesses(response.data.data || []); // Update state with results
      } catch (error) {
        console.error('Error fetching businesses:', error);
        setBusinesses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [debouncedQuery]); // Trigger API call whenever debouncedQuery changes

  const renderResults = () => {
    if (loading) {
      return (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <CircularProgress />
        </Box>
      );
    }

    if (businesses.length === 0) {
      return (
        <Box sx={{ p: 3, textAlign: 'center', color: theme.palette.text.secondary }}>
          No results found
        </Box>
      );
    }

    return businesses.map((business) => {
      const linkTo = paths.bussiness.details(business?.id);
      return (
        <Box
          key={business.id}
          component={RouterLink}
          to={linkTo}
          sx={{
            p: 2,
            display: 'flex',
            cursor: 'pointer',
            alignItems: 'center',
            borderBottom: `solid 1px ${theme.palette.divider}`,
            '&:hover': { bgcolor: theme.palette.action.hover },
            textDecoration: 'none', // Ensures no underline
            color: 'inherit', // Inherit color from theme
          }}
        >
          <Iconify
            icon="eva:briefcase-fill"
            width={24}
            sx={{ mr: 2, color: theme.palette.text.primary }}
          />
          <Typography
            variant="body2"
            sx={{
              alignSelf: 'flex-end',
              color: theme.palette.text.primary, // Apply primary text color
            }}
          >
            {business.business_name}
          </Typography>
        </Box>
      );
    });
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        onClick={handleOpen}
        sx={{
          pr: { sm: 1 },
          borderRadius: { sm: 1.5 },
          cursor: 'pointer',
          // bgcolor: { sm: theme.palette.grey[100] },
          ...sx,
        }}
        {...other}
      >
        <Iconify icon="eva:search-fill" width={24} />
      </Box>

      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { mt: 15, overflow: 'unset', borderRadius: 2 },
        }}
      >
        <Box sx={{ p: 3, borderBottom: `solid 1px ${theme.palette.divider}` }}>
          <InputBase
            fullWidth
            autoFocus
            placeholder="Search businesses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" width={24} sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
          />
        </Box>

        <Scrollbar sx={{ px: 3, pb: 3, pt: 2, height: 400 }}>{renderResults()}</Scrollbar>
      </Dialog>
    </>
  );
}
