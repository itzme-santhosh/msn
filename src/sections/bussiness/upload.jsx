import { useDropzone } from 'react-dropzone';
import { useState, useCallback } from 'react';

import {
  Box,
  Alert,
  Table,
  Paper,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
  CircularProgress,
} from '@mui/material';

import { useUploadFile } from 'src/actions/use-upload-file';

export function FileUpload({ onUploadComplete }) {
  const { upload, isLoading, error } = useUploadFile();
  const [validationErrors, setValidationErrors] = useState([]);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        try {
          setValidationErrors([]);
          const formData = new FormData();
          formData.append('file', file);

          const result = await upload(formData);

          // Handle missing columns error specifically
          if (result.errors?.some((e) => e.message === 'Missing required columns')) {
            const missingColsError = result.errors.find(
              (e) => e.message === 'Missing required columns'
            );
            setValidationErrors([
              {
                row: 'Entire File',
                message: 'Missing required columns',
                errors: {
                  file: missingColsError.errors.file,
                },
              },
            ]);
          } else if (result.errors && result.errors.length > 0) {
            setValidationErrors(result.errors);
          } else {
            setValidationErrors([]);
          }

          onUploadComplete(result);
        } catch (err) {
          setValidationErrors([]);
        }
      }
    },
    [upload, onUploadComplete]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const downloadTemplate = () => {
    // Replace with your actual template download URL
    const templateUrl = '/templates/business-import-template.xlsx';
    const link = document.createElement('a');
    link.href = templateUrl;
    link.download = 'business-import-template.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={downloadTemplate}
        >
          Download Template
        </Button>
      </Box> */}

      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed',
          borderColor: isDragActive ? 'primary.main' : 'divider',
          borderRadius: 1,
          p: 3,
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
          '&:hover': {
            borderColor: 'primary.main',
          },
          mb: 2,
        }}
      >
        <input {...getInputProps()} />
        {isLoading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <CircularProgress />
            <Typography variant="body2">Processing file...</Typography>
          </Box>
        ) : (
          <>
            <Button variant="contained" component="span" sx={{ mb: 1 }}>
              Upload File
            </Button>
            <Typography variant="body2" color="text.secondary">
              {isDragActive
                ? 'Drop the file here'
                : 'Drag and drop a CSV or Excel file, or click to select'}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Supported formats: .csv, .xls, .xlsx (Max 5MB)
            </Typography>
          </>
        )}
      </Box>

      {validationErrors.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Alert severity="warning" sx={{ mb: 2 }}>
            Found {validationErrors.length} issue{validationErrors.length !== 1 ? 's' : ''} in your
            file
          </Alert>

          <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: 'auto' }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Row</TableCell>
                  <TableCell>Issue Type</TableCell>
                  <TableCell>Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {validationErrors.map((err, index) => (
                  <TableRow key={index}>
                    <TableCell>{err.row}</TableCell>
                    <TableCell>{err.message}</TableCell>
                    <TableCell>
                      {err.errors?.file ? (
                        err.errors.file
                      ) : (
                        <ul style={{ margin: 0, paddingLeft: 20 }}>
                          {Object.entries(err.errors || {}).map(([field, messages]) => (
                            <li key={field}>
                              <strong>{field.replace('_', ' ')}:</strong> {messages.join(', ')}
                            </li>
                          ))}
                        </ul>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
}
