import { useFieldArray, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';

export function RHFArray({
  name,
  label,
  renderItem,
  defaultValue = {},
  slotProps,
  helperText,
  ...other
}) {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <Stack spacing={2} {...other}>
      {label && (
        <Typography variant="subtitle2" sx={{ ...slotProps?.label }}>
          {label}
        </Typography>
      )}

      <Stack spacing={2}>
        {fields.map((field, index) => (
          <Box
            key={field.id}
            sx={{
              p: 2,
              borderRadius: 1,
              position: 'relative',
              bgcolor: 'background.neutral',
              ...slotProps?.itemWrapper,
            }}
          >
            <IconButton
              size="small"
              onClick={() => remove(index)}
              sx={{
                p: 0.5,
                top: 8,
                right: 8,
                position: 'absolute',
                ...slotProps?.removeButton,
              }}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>

            {renderItem(index)}
          </Box>
        ))}
      </Stack>

      <Box sx={{ textAlign: 'right' }}>
        <Button
          size="small"
          startIcon={<AddIcon />}
          onClick={() => append(defaultValue)}
          sx={{ ...slotProps?.addButton }}
        >
          Add {label}
        </Button>
      </Box>

      {helperText && (
        <Typography variant="caption" sx={{ color: 'text.secondary', ...slotProps?.helperText }}>
          {helperText}
        </Typography>
      )}
    </Stack>
  );
}
