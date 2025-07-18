import React from 'react';

import { Box, Stack, TextField, InputAdornment } from '@mui/material';

import { Iconify } from 'src/components/iconify';

export default function DualSearch() {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        width: '100%',
        maxWidth: { xs: '100%', md: 800 }, // Increased maxWidth for mobile
        backgroundColor: '#fff',
        borderRadius: 8,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
        padding: { xs: '0 12px', sm: '0 16px' }, // Adjust padding on mobile
        height: 48,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <TextField
          variant="standard"
          fullWidth
          placeholder="Search for 'A'"
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="solar:search-bold-duotone" width={20} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiInputBase-root': {
              fontSize: 14,
              color: '#6b7280',
            },
          }}
        />
      </Box>
    </Stack>
  );
}
