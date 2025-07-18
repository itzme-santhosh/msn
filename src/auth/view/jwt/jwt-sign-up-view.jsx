import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { signUp } from '../../context/jwt';
import { useAuthContext } from '../../hooks';
import { FormHead } from '../../components/form-head';
import { SignUpTerms } from '../../components/sign-up-terms';

// Service Category Options
const SERVICE_CATEGORY_GROUP_OPTIONS = [
  {
    group: 'Home Care',
    classify: ['Lawn', 'Appliances', 'Landscaping', 'Lighting', 'Electrical', 'Cleaning'],
  },
  {
    group: 'Food',
    classify: ['Catering', 'Delivery', 'Pickup', 'Groceries', 'Restaurants'],
  },
  {
    group: 'Kids',
    classify: ['Vocal', 'Dance', 'Instruments', 'Academic', 'College Prep'],
  },
  {
    group: 'Finance',
    classify: ['Taxes', 'Financial Planning', 'Insurance', 'Real Estate', 'Rental Property'],
  },
];

// Validation Schema
export const SignUpSchema = zod.object({
  firstName: zod.string().min(1, { message: 'First name is required!' }),
  lastName: zod.string().min(1, { message: 'Last name is required!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  password: zod.string().min(6, { message: 'Password must be at least 6 characters!' }),
  contactMobile: zod.string().min(10, { message: 'Mobile number is required!' }),
  acceptSms: zod.boolean(),
  serviceCategory: zod.string().min(1, { message: 'Service category is required!' }),
  serviceSubCategory: zod.array(zod.string()).min(1, { message: 'Sub-category is required!' }),
});

// ----------------------------------------------------------------------

export function JwtSignUpView() {
  const { checkUserSession } = useAuthContext();

  const router = useRouter();
  const password = useBoolean();
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contactMobile: '',
    acceptSms: false,
    serviceCategory: '',
    serviceSubCategory: [],
  };

  const methods = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setValue('serviceSubCategory', []); // Reset subcategory
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUp(data);
      await checkUserSession?.();
      router.refresh();
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderForm = (
    <Box gap={3} display="flex" flexDirection="column">
      {/* Name Fields */}
      <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: 'column', sm: 'row' }}>
        <Field.Text name="firstName" label="First name" InputLabelProps={{ shrink: true }} />
        <Field.Text name="lastName" label="Last name" InputLabelProps={{ shrink: true }} />
      </Box>

      <Field.Text name="email" label="Email address" InputLabelProps={{ shrink: true }} />

      <Field.Text
        name="password"
        label="Password"
        placeholder="6+ characters"
        type={password.value ? 'text' : 'password'}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* New Fields */}
      <Field.Text
        name="contactMobile"
        label="Contact Mobile Phone Number"
        InputLabelProps={{ shrink: true }}
      />

      <FormControlLabel
        control={<Checkbox name="acceptSms" />}
        label="Accept SMS notifications for this number"
      />
      <Field.Select
        name="serviceCategory"
        label="Service Category"
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value); // Update local state
          setValue('serviceCategory', e.target.value); // Update form state
          setValue('serviceSubCategory', []); // Reset subcategory to an empty array
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {SERVICE_CATEGORY_GROUP_OPTIONS.map((category) => (
          <MenuItem key={category.group} value={category.group}>
            {category.group}
          </MenuItem>
        ))}
      </Field.Select>

      {/* Multi-Select Sub-Category */}
      {selectedCategory && (
        <Field.MultiSelect
          checkbox
          name="serviceSubCategory"
          label="Service Sub-Category"
          options={SERVICE_CATEGORY_GROUP_OPTIONS.find(
            (category) => category.group === selectedCategory
          )?.classify.map((sub) => ({ value: sub, label: sub }))}
        />
      )}

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Creating account..."
      >
        Create account
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <FormHead
        title="Get started absolutely free"
        description={
          <>
            {`Already have an account? `}
            <Link component={RouterLink} href={paths.auth.jwt.signIn} variant="subtitle2">
              Get started
            </Link>
          </>
        }
        sx={{ textAlign: { xs: 'center', md: 'left' } }}
      />

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>

      <SignUpTerms />
    </>
  );
}
