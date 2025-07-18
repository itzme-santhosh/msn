import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';

import { Delete } from '@mui/icons-material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useTheme, createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Box,
  Link,
  Chip,
  Stack,
  Avatar,
  Button,
  Select,
  MenuItem,
  Typography,
  IconButton,
  FormControl,
  CircularProgress,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { backendFetcher } from 'src/utils/axios';

import { deleteProduct, useGetmsnProducts } from 'src/actions/product';

import { Iconify } from 'src/components/iconify';

import { FileUpload } from '../upload';

// Export button component
function ExportButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [format, setFormat] = useState('xlsx');

  const handleExport = async () => {
    setIsLoading(true);
    try {
      const response = await backendFetcher([
        `/api/businesses/export?format=${format}`,
        { responseType: 'blob' },
      ]);

      const blob = new Blob([response.data], {
        type: response.headers['content-type'],
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `businesses_${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <FormControl size="small">
        <Select value={format} onChange={(e) => setFormat(e.target.value)} sx={{ minWidth: 120 }}>
          <MenuItem value="xlsx">Excel (.xlsx)</MenuItem>
          <MenuItem value="csv">CSV (.csv)</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        onClick={handleExport}
        disabled={isLoading}
        startIcon={isLoading ? <CircularProgress size={20} /> : <FileDownloadIcon />}
        size="small"
        sx={{
          borderRadius: '8px',
          textTransform: 'none',
        }}
      >
        Export
      </Button>
    </Box>
  );
}

// Updated component hook usage
export function BussinessListView() {
  const theme = useTheme();
  const router = useRouter();

  // Data and fetching state
  const [tableData, setTableData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  // Table state
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Updated hook call with all parameters
  const { products, productsLoading, productsError, refetch, totalRowCount } = useGetmsnProducts({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    columnFilters,
    globalFilter,
    sorting,
  });

  const handleClick = useCallback(
    (id) => {
      router.push(paths.dashboard.bussiness.edit(id));
    },
    [router]
  );

  const handleOwnerClick = useCallback(
    (id) => {
      router.push(paths.dashboard.user.edit(id));
    },
    [router]
  );

  const handleDelete = useCallback(
    async (id) => {
      try {
        setIsRefetching(true);
        await deleteProduct(id);
        await refetch();
      } catch (error) {
        console.error('Error deleting business:', error);
        setIsError(true);
      } finally {
        setIsRefetching(false);
      }
    },
    [refetch]
  );

  const handleUploadComplete = useCallback(
    async (result) => {
      console.log('Upload result:', result);
      setIsRefetching(true);
      await refetch();
      setIsRefetching(false);
    },
    [refetch]
  );

  const handleAddNew = useCallback(() => {
    router.push(paths.dashboard.bussiness.new);
  }, [router]);

  const tableTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme.palette.mode,
          primary: theme.palette.primary,
          background: {
            default: theme.palette.background.default,
            paper: theme.palette.background.paper,
          },
        },
        components: {
          MuiTableContainer: {
            styleOverrides: {
              root: {
                backgroundColor: 'inherit',
              },
            },
          },
          MuiTableCell: {
            styleOverrides: {
              root: {
                padding: '8px 16px',
                whiteSpace: 'normal',
                wordBreak: 'break-word',
              },
            },
          },
        },
      }),
    [theme.palette.mode, theme.palette.primary, theme.palette.background]
  );

  const fetchData = useCallback(async () => {
    try {
      if (products) {
        setTableData(products.data || []);
        setRowCount(totalRowCount || 0);
      } else {
        setTableData([]);
        setRowCount(0);
      }
      setIsError(false);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setTableData([]);
      setRowCount(0);
    }
  }, [products, totalRowCount]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Custom cell components (same as before)
  const PhotoCell = useCallback(
    ({ value }) =>
      value && value.length > 0 ? (
        <Avatar
          src={value[0]}
          alt="Business Photo"
          variant="square"
          sx={{ width: 50, height: 50, borderRadius: 1 }}
        />
      ) : (
        <Box
          sx={{
            width: 50,
            height: 50,
            backgroundColor: theme.palette.grey[200],
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" color="text.secondary">
            No Image
          </Typography>
        </Box>
      ),
    [theme.palette.grey]
  );

  const BusinessNameCell = useCallback(
    ({ value, row }) => (
      <Link
        color="primary"
        onClick={() => handleClick(row.original.id)}
        variant="inherit"
        underline="hover"
        sx={{ cursor: 'pointer', color: 'primary.main', fontWeight: 500 }}
      >
        {value || 'N/A'}
      </Link>
    ),
    [handleClick]
  );

  const OwnerCell = useCallback(
    ({ value }) =>
      value ? (
        <Link
          onClick={() => handleOwnerClick(value.id)}
          variant="inherit"
          underline="hover"
          sx={{ cursor: 'pointer', color: 'primary.main' }}
        >
          {value.name}
        </Link>
      ) : (
        <Typography variant="body2" color="text.secondary">
          N/A
        </Typography>
      ),
    [handleOwnerClick]
  );

  const WebsiteCell = useCallback(
    ({ value }) =>
      value ? (
        <Link
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: 'primary.main',
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          {value.length > 30 ? `${value.substring(0, 30)}...` : value}
        </Link>
      ) : (
        <Typography variant="body2" color="text.secondary">
          N/A
        </Typography>
      ),
    []
  );

  const VerifiedCell = useCallback(
    ({ value }) => (
      <Chip
        label={value ? 'Verified' : 'Unverified'}
        size="small"
        color={value ? 'success' : 'default'}
        variant={value ? 'filled' : 'outlined'}
        sx={{
          borderRadius: '16px',
          fontSize: '0.75rem',
          fontWeight: 'bold',
        }}
      />
    ),
    []
  );

  const ActionCell = useCallback(
    ({ row }) => (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <IconButton
          color="error"
          onClick={() => handleDelete(row.original.id)}
          title="Delete"
          size="small"
          sx={{
            '&:hover': {
              backgroundColor: theme.palette.error.lighter,
            },
          }}
        >
          <Delete fontSize="small" />
        </IconButton>
      </Box>
    ),
    [handleDelete, theme.palette.error.lighter]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: 'business_photos',
        header: 'Photo',
        size: 80,
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ cell }) => <PhotoCell value={cell.getValue()} />,
      },
      {
        accessorKey: 'business_name',
        header: 'Business Name',
        size: 200,
        Cell: ({ cell, row }) => <BusinessNameCell value={cell.getValue()} row={row} />,
      },
      {
        accessorKey: 'creator.name',
        header: 'Created By',
        size: 150,
        enableSorting: false, // Since this is a relationship, disable sorting unless handled specially
        Cell: ({ cell }) => <OwnerCell value={cell.getValue()} />,
      },
      {
        accessorKey: 'owner_name',
        header: 'Owner Name',
        size: 150,
        Cell: ({ cell }) => <Typography variant="body2">{cell.getValue() || 'N/A'}</Typography>,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 200,
        Cell: ({ cell }) => <Typography variant="body2">{cell.getValue() || 'N/A'}</Typography>,
      },
      {
        accessorKey: 'mobile_phone',
        header: 'Mobile',
        size: 120,
        Cell: ({ cell }) => <Typography variant="body2">{cell.getValue() || 'N/A'}</Typography>,
      },
      {
        accessorKey: 'website',
        header: 'Website',
        size: 200,
        enableSorting: false, // URLs might not sort meaningfully
        Cell: ({ cell }) => <WebsiteCell value={cell.getValue()} />,
      },
      {
        accessorKey: 'is_verified',
        header: 'Verified',
        size: 100,
        Cell: ({ cell }) => <VerifiedCell value={cell.getValue()} />,
      },
      {
        id: 'actions',
        header: 'Actions',
        size: 80,
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ row }) => <ActionCell row={row} />,
      },
    ],
    []
  );

  // Common styling properties
  const commonStyles = useMemo(
    () => ({
      backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : 'inherit',
    }),
    [theme.palette.mode]
  );

  // Consolidated table props - Updated to match ServiceSpecificationListView
  const tableProps = useMemo(
    () => ({
      columns,
      data: tableData,
      enableRowSelection: true,
      getRowId: (row) => row.id,
      initialState: {
        showColumnFilters: false,
        density: 'compact',
        columnVisibility: {},
      },
      manualFiltering: true,
      manualPagination: true,
      manualSorting: true,
      enableColumnFilterModes: true,
      enableColumnOrdering: true,
      enablePinning: true,
      enableStickyHeader: true,
      enableColumnResizing: true,
      enableFullScreenToggle: true,
      muiToolbarAlertBannerProps:
        isError || productsError
          ? {
              color: 'error',
              children: 'Error loading data',
            }
          : undefined,
      onColumnFiltersChange: setColumnFilters,
      onGlobalFilterChange: setGlobalFilter,
      onPaginationChange: setPagination,
      onSortingChange: setSorting,
      rowCount,
      state: {
        columnFilters,
        globalFilter,
        isLoading: productsLoading,
        pagination,
        showAlertBanner: isError || productsError,
        showProgressBars: isRefetching,
        sorting,
      },
      renderTopToolbarCustomActions: () => (
        <Stack direction="row" spacing={1} sx={{ p: 1, alignItems: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddNew}
            size="small"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Business
          </Button>
          <FileUpload onUploadComplete={handleUploadComplete} />
          <ExportButton />
        </Stack>
      ),
      // Consolidated styling props
      muiTablePaperProps: {
        elevation: 0,
        sx: {
          borderRadius: '0.5rem',
          border: '1px solid',
          borderColor: theme.palette.divider,
          overflow: 'hidden',
          maxWidth: '100%',
          ...commonStyles,
        },
      },
      muiTableContainerProps: {
        sx: {
          width: '100%',
          overflowX: 'auto',
          maxHeight: 600,
          ...commonStyles,
        },
      },
      muiTableHeadCellProps: {
        sx: {
          backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : theme.palette.grey[900],
          fontWeight: 'bold',
        },
      },
      muiTopToolbarProps: { sx: commonStyles },
      muiBottomToolbarProps: { sx: commonStyles },
      muiTableBodyCellProps: {
        sx: {
          ...commonStyles,
          fontSize: '0.875rem',
        },
      },
      muiTableBodyRowProps: {
        sx: {
          ...commonStyles,
          '&:nth-of-type(odd)': {
            backgroundColor:
              theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.03)',
          },
          '&:hover': {
            backgroundColor:
              theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.05)',
          },
        },
      },
      muiTablePaginationProps: {
        rowsPerPageOptions: [5, 10, 20, 50],
      },
      renderEmptyRowsFallback: () => (
        <Box
          sx={{
            textAlign: 'center',
            py: 3,
            ...commonStyles,
          }}
        >
          <Typography variant="body2">No businesses found</Typography>
        </Box>
      ),
      muiLinearProgressProps: {
        sx: { display: productsLoading ? 'block' : 'none' },
      },
      positionToolbarAlertBanner: 'bottom',
    }),
    [
      columns,
      tableData,
      isError,
      productsError,
      rowCount,
      columnFilters,
      globalFilter,
      productsLoading,
      pagination,
      isRefetching,
      sorting,
      theme,
      commonStyles,
      handleAddNew,
      handleUploadComplete,
    ]
  );

  // Use the MaterialReactTable hook with memoized props
  const table = useMaterialReactTable(tableProps);

  // Loading state
  if (productsLoading && !tableData.length) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={tableTheme}>
      <MaterialReactTable table={table} />
    </ThemeProvider>
  );
}
