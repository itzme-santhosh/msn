import { MaterialReactTable } from 'material-react-table';
import React, { useMemo, useState, useCallback } from 'react';

import { Delete } from '@mui/icons-material';
import { Box, Link, Button, Typography, IconButton, CircularProgress } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { deleteUser, useGetUsers } from 'src/actions/users';

import { Iconify } from 'src/components/iconify';

export function UserListView() {
  const router = useRouter();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { users, userssLoading, usersError, refetch } = useGetUsers(
    pagination.pageIndex + 1,
    pagination.pageSize
  );

  const handleClick = useCallback(
    (id) => {
      router.push(paths.dashboard.user.edit(id));
    },
    [router]
  );

  const handleDelete = useCallback(
    async (id) => {
      try {
        await deleteUser(id);
        refetch();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
    [refetch]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        Cell: ({ cell, row }) => (
          <Link
            color="primary"
            onClick={() => handleClick(row.original.id)}
            variant="inherit"
            underline="hover"
            sx={{ cursor: 'pointer', color: 'primary.main' }}
          >
            {cell.getValue() || 'N/A'}
          </Link>
        ),
      },
      {
        accessorKey: 'email',
        header: 'Email',
        Cell: ({ cell }) => <Typography variant="body2">{cell.getValue() || 'N/A'}</Typography>,
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
        Cell: ({ cell }) => <Typography variant="body2">{cell.getValue() || 'N/A'}</Typography>,
      },
      {
        accessorKey: 'role',
        header: 'Role',
        Cell: ({ cell }) => <Typography variant="body2">{cell.getValue() || 'N/A'}</Typography>,
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton color="error" onClick={() => handleDelete(row.original.id)} title="Delete">
              <Delete />
            </IconButton>
          </Box>
        ),
        size: 60,
      },
    ],
    [handleClick, handleDelete]
  );

  const handlePaginationChange = useCallback((paginationState) => {
    setPagination(paginationState);
  }, []);

  if (userssLoading) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (usersError) {
    return (
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Typography color="error">Failed to load data. Please try again.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ flex: 1 }}>
          User List
        </Typography>

        <Button
          component={RouterLink}
          href={paths.dashboard.user.new}
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          New User
        </Button>
      </Box>

      <MaterialReactTable
        columns={columns}
        data={users?.data || []}
        manualPagination
        rowCount={users?.total || 0}
        state={{ pagination }}
        onPaginationChange={handlePaginationChange}
        muiTableBodyCellProps={{
          sx: { fontSize: '0.875rem', wordWrap: 'break-word' },
        }}
        muiTableContainerProps={{
          sx: { maxHeight: 600, overflowY: 'auto' },
        }}
        muiTableHeadCellProps={{
          sx: { backgroundColor: '#f5f5f5' },
        }}
        muiTablePaginationProps={{
          rowsPerPageOptions: [5, 10, 20, 50],
        }}
      />
    </Box>
  );
}
