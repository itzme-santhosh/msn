import { useMemo, useCallback } from 'react';
import { useFieldArray } from 'react-hook-form';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';

import { Field } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';

export function MenuItems({ control, watch, setValue }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'menu_items',
  });

  const watchedMenuItems = watch('menu_items'); // Extract watch value first

  const menuItems = useMemo(() => watchedMenuItems || [], [watchedMenuItems]);

  const handleAdd = () => {
    append({
      name: '',
      description: '',
      price: 0,
      quantity: 1,
      total: 0,
    });
  };

  const handleChangeQuantity = useCallback(
    (event, index) => {
      const newQuantity = Number(event.target.value);
      const currentPrice = menuItems[index]?.price || 0;

      setValue(`menu_items.${index}.quantity`, newQuantity);
      setValue(`menu_items.${index}.total`, Number((newQuantity * currentPrice).toFixed(2)));
    },
    [setValue, menuItems]
  );

  const handleChangePrice = useCallback(
    (event, index) => {
      const newPrice = Number(event.target.value);
      const currentQuantity = menuItems[index]?.quantity || 1;

      setValue(`menu_items.${index}.price`, newPrice);
      setValue(`menu_items.${index}.total`, Number((newPrice * currentQuantity).toFixed(2)));
    },
    [setValue, menuItems]
  );

  // useEffect(() => {
  //   if (!watchedMenuItems.length) {
  //     append({
  //       name: '',
  //       description: '',
  //       price: 0,
  //       quantity: 1,
  //       total: 0,
  //     });
  //   }
  // }, []);

  return (
    <Stack spacing={3}>
      {fields.map((field, index) => (
        <Stack key={field.id} spacing={2}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <Field.Text name={`menu_items.${index}.name`} label="Item Name" size="small" />

            <Field.Text name={`menu_items.${index}.description`} label="Description" size="small" />

            <Field.Text
              size="small"
              type="number"
              name={`menu_items.${index}.quantity`}
              label="Quantity"
              defaultValue={1}
              onChange={(event) => handleChangeQuantity(event, index)}
              sx={{ maxWidth: { md: 96 } }}
            />

            <Field.Text
              size="small"
              type="number"
              name={`menu_items.${index}.price`}
              label="Price"
              defaultValue={0}
              onChange={(event) => handleChangePrice(event, index)}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              sx={{ maxWidth: { md: 120 } }}
            />

            <Field.Text
              disabled
              size="small"
              name={`menu_items.${index}.total`}
              label="Total"
              value={menuItems[index]?.total || 0}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              sx={{ maxWidth: { md: 120 } }}
            />
          </Stack>

          <Button
            size="small"
            color="error"
            startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
            onClick={() => remove(index)}
            sx={{ alignSelf: 'flex-end' }}
          >
            Remove
          </Button>
        </Stack>
      ))}

      <Button
        size="small"
        startIcon={<Iconify icon="mingcute:add-line" />}
        onClick={handleAdd}
        sx={{ alignSelf: 'flex-start' }}
      >
        Add Menu Item
      </Button>
    </Stack>
  );
}
