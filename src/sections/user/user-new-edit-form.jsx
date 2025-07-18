import { z as zod } from 'zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { MenuItem } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { editUser, createUser, useGetUsers } from 'src/actions/users';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const ROLES = [
  { value: 'customer', label: 'Customer' },
  { value: 'business', label: 'Business' },
  { value: 'admin', label: 'Admin' },
];
// Updated Schema

// ----------------------------------------------------------------------

export function UserNewEditForm({ currentUser }) {
  const NewUserSchema = useMemo(() => {
    const baseSchema = zod.object({
      name: zod.string().min(1, { message: 'Name is required!' }),
      email: zod
        .string()
        .min(1, { message: 'Email is required!' })
        .email({ message: 'Email must be a valid email address!' }),
      phone: zod.string().min(1, { message: 'Phone is required!' }),
      role: zod.enum(['customer', 'business', 'admin'], { message: 'Invalid role!' }),
    });
    // Make the password field required only when creating a user
    return currentUser
      ? baseSchema.extend({
          password: zod.string().optional(),
        })
      : baseSchema.extend({
          password: zod.string().min(6, { message: 'Password must be at least 6 characters!' }),
        });
  }, [currentUser]);

  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
      password: '', // Password will only be used for new user creation
      role: currentUser?.role || 'customer',
    }),
    [currentUser]
  );

  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  const { refetch } = useGetUsers();

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentUser) {
        await editUser(currentUser.id, data);
        toast.success('Update success!');
      } else {
        await createUser(data);
        toast.success('Create success!');
      }
      reset();
      await refetch();
      router.push(paths.dashboard.user.list);
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card>
        <Stack spacing={3} sx={{ p: 3 }}>
          <Field.Text name="name" label="Full name" />
          <Field.Text name="email" label="Email address" />
          <Field.Text name="phone" label="Phone number" />

          {/* Render password field only when creating a new user */}
          {!currentUser && (
            <Field.Text
              name="password"
              label="Password"
              type="password"
              helperText="Password must be at least 6 characters long"
            />
          )}
          <Field.Select name="role" label="Role">
            {ROLES.map((role) => (
              <MenuItem key={role.value} value={role.value}>
                {role.label}
              </MenuItem>
            ))}
          </Field.Select>
          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {!currentUser ? 'Create user' : 'Save changes'}
            </LoadingButton>
          </Stack>
        </Stack>
      </Card>
    </Form>
  );
}
