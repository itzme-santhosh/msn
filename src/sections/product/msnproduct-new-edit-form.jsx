import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { Chip, MenuItem } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { _tags } from 'src/_mock';
import { editProduct, createProduct } from 'src/actions/product';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

import { CATEGORIES, BusinessSchema } from './components/schema';

const DAYS_OF_WEEK = [
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
  { value: 'sunday', label: 'Sunday' },
];

export function MSNProductNewEditForm({ currentBusiness }) {
  const router = useRouter();
  const [category, setCategory] = useState(currentBusiness?.category || '');
  const [removedFiles, setRemovedFiles] = useState([]);

  const defaultValues = useMemo(
    () => ({
      business_name: currentBusiness?.business_name || '',
      owner_name: currentBusiness?.owner_name || '',
      email: currentBusiness?.email || '',
      mobile_phone: currentBusiness?.mobile_phone || '',
      whatsapp_group_link: currentBusiness?.whatsapp_group_link || '',
      instagram_handle: currentBusiness?.instagram_handle || '',
      website: currentBusiness?.website || '',
      description: currentBusiness?.description || '',
      special_offers: currentBusiness?.special_offers || '',
      business_photos: currentBusiness?.business_photos || [],
      business_hours: currentBusiness?.business_hours || {},
      category: currentBusiness?.category || '',
      tags: Array.isArray(currentBusiness?.tags) ? currentBusiness.tags : [],
      areas_served_cities: Array.isArray(currentBusiness?.areas_served_cities)
        ? currentBusiness.areas_served_cities
        : [],
      areas_served_zipcodes: Array.isArray(currentBusiness?.areas_served_zipcodes)
        ? currentBusiness.areas_served_zipcodes
        : [],
      // Category-specific fields with defaults
      menu: currentBusiness?.category_fields?.menu || '',
      food_pricing: currentBusiness?.category_fields?.food_pricing || '',
      catering_type: currentBusiness?.category_fields?.catering_type || '',
      delivery_pricing: currentBusiness?.category_fields?.delivery_pricing || '',
      availability_calendar: currentBusiness?.category_fields?.availability_calendar || '',
      age_range: currentBusiness?.category_fields?.age_range || '',
      activity_type: currentBusiness?.category_fields?.activity_type || '',
      safety_certifications: currentBusiness?.category_fields?.safety_certifications || '',
      staff_qualifications: currentBusiness?.category_fields?.staff_qualifications || '',
      service_type: currentBusiness?.category_fields?.service_type || '',
      pricing_model: currentBusiness?.category_fields?.pricing_model || '',
      insured: currentBusiness?.category_fields?.insured || false,
      service_guarantee: currentBusiness?.category_fields?.service_guarantee || '',
      certifications: currentBusiness?.category_fields?.certifications || '',
      minimum_investment: currentBusiness?.category_fields?.minimum_investment || '',
      target_clients: currentBusiness?.category_fields?.target_clients || '',
    }),
    [currentBusiness]
  );

  const methods = useForm({
    resolver: zodResolver(BusinessSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const values = watch();
  console.log('Form errors:', errors);
  useEffect(() => {
    if (currentBusiness) {
      reset(defaultValues);
    }
  }, [currentBusiness, defaultValues, reset]);

  // Category-specific form fields
  const renderCategoryFields = () => {
    const selectedCategory = watch('category');
    switch (selectedCategory) {
      case 'Food':
        return (
          <>
            <Field.Text name="menu" label="Menu" multiline rows={4} />
            <Field.Text name="food_pricing" label="Food Pricing" />
            <Field.Text name="catering_type" label="Catering Type" />
            <Field.Text name="delivery_pricing" label="Delivery Pricing" />
            <Field.Text name="availability_calendar" label="Availability Calendar" />
          </>
        );
      case 'Kids':
        return (
          <>
            <Field.Text name="age_range" label="Age Range" />
            <Field.Text name="activity_type" label="Activity Type" />
            <Field.Text name="safety_certifications" label="Safety Certifications" />
            <Field.Text name="staff_qualifications" label="Staff Qualifications" />
          </>
        );
      case 'Home':
        return (
          <>
            <Field.Text name="service_type" label="Service Type" />
            <Field.Text name="pricing_model" label="Pricing Model" />
            <Field.Switch name="insured" label="Insured" />
            <Field.Text name="service_guarantee" label="Service Guarantee" />
          </>
        );
      case 'Finance':
        return (
          <>
            <Field.Text name="service_type" label="Service Type" />
            <Field.Text name="certifications" label="Certifications" />
            <Field.Text name="minimum_investment" label="Minimum Investment" type="number" />
            <Field.Text name="target_clients" label="Target Clients" />
          </>
        );
      default:
        return null;
    }
  };

  const processFiles = async (files) => {
    if (!files || !Array.isArray(files)) return [];

    const filePromises = files
      .filter((file) => file instanceof File)
      .map(
        (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      );

    return Promise.all(filePromises);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();

      // Add PUT method for Laravel
      if (currentBusiness) {
        formData.append('_method', 'PUT');
      }

      // Append simple key-value pairs
      const simpleFields = [
        'business_name',
        'owner_name',
        'email',
        'category',
        'mobile_phone',
        'whatsapp_group_link',
        'instagram_handle',
        'website',
        'description',
        'special_offers',
      ];

      simpleFields.forEach((field) => {
        formData.append(field, data[field] || '');
      });

      // Append array fields with [] notation
      if (Array.isArray(data.tags)) {
        data.tags.forEach((tag) => {
          formData.append('tags[]', tag);
        });
      }

      if (Array.isArray(data.areas_served_cities)) {
        data.areas_served_cities.forEach((city) => {
          formData.append('areas_served_cities[]', city);
        });
      }

      if (Array.isArray(data.areas_served_zipcodes)) {
        data.areas_served_zipcodes.forEach((zip) => {
          formData.append('areas_served_zipcodes[]', zip);
        });
      }

      // Append category fields with bracket notation
      const categoryFields = {};
      const selectedCategory = data.category;

      if (selectedCategory === 'Food') {
        const foodFields = [
          'menu',
          'food_pricing',
          'catering_type',
          'delivery_pricing',
          'availability_calendar',
        ];

        foodFields.forEach((field) => {
          if (data[field]) {
            formData.append(`category_fields[${field}]`, data[field]);
          }
        });
      } else if (selectedCategory === 'Kids') {
        const kidsFields = [
          'age_range',
          'activity_type',
          'safety_certifications',
          'staff_qualifications',
        ];

        kidsFields.forEach((field) => {
          if (data[field]) {
            formData.append(`category_fields[${field}]`, data[field]);
          }
        });
      }

      // Handle removed images
      if (removedFiles.length > 0) {
        removedFiles.forEach((file) => {
          formData.append('images_to_remove[]', file);
        });
      }

      // Handle new image uploads
      if (data.business_photos && data.business_photos.length) {
        data.business_photos.forEach((file) => {
          if (file instanceof File) {
            formData.append('business_photos[]', file);
          } else if (typeof file === 'string') {
            // For previously uploaded image URLs
            formData.append('existing_photos[]', file);
          }
        });
      }

      // API call
      if (currentBusiness) {
        await editProduct(currentBusiness.id, formData);
        toast.success('Business updated successfully!');
      } else {
        await createProduct(formData);
        toast.success('Business created successfully!');
      }

      router.push(paths.dashboard.bussiness.root);
    } catch (error) {
      console.error('Submission error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to process business data';
      toast.error(errorMessage);
    }
  });

  const handleRemoveFile = useCallback(
    (file) => {
      setValue(
        'business_photos',
        values.business_photos.filter((item) => item !== file),
        { shouldValidate: true }
      );
      if (currentBusiness?.business_photos?.includes(file)) {
        setRemovedFiles((prev) => [...prev, file]);
      }
    },
    [currentBusiness, setValue, values.business_photos]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('business_photos', [], { shouldValidate: true });
    setRemovedFiles((prev) => [...prev, ...values.business_photos]);
  }, [setValue, values.business_photos]);

  const renderDetails = (
    <Card>
      <CardHeader title="Business Details" sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text name="business_name" label="Business Name" />
        <Field.Text name="owner_name" label="Owner Name" />
        <Field.Text name="email" label="Email" type="email" />

        <Field.Select
          name="category"
          label="Category"
          onChange={(e) => {
            const newCategory = e.target.value;
            setCategory(newCategory);
            setValue('category', newCategory, { shouldValidate: true });
          }}
        >
          {CATEGORIES.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Field.Select>

        <Field.Text name="mobile_phone" label="Mobile Phone" />
        <Field.Text name="whatsapp_group_link" label="WhatsApp Group Link" />
        <Field.Text name="instagram_handle" label="Instagram Handle" />
        <Field.Text name="website" label="Website" />

        <Field.Autocomplete
          name="areas_served_cities"
          label="Cities Served"
          placeholder="+ Add city"
          multiple
          freeSolo
          disableCloseOnSelect
          options={[]}
          getOptionLabel={(option) => option}
          renderTags={(selected, getTagProps) =>
            selected?.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option}
                label={option}
                size="small"
                color="info"
                variant="soft"
              />
            ))
          }
        />

        <Field.Autocomplete
          name="areas_served_zipcodes"
          label="Zipcodes Served"
          placeholder="+ Add zipcode"
          multiple
          freeSolo
          disableCloseOnSelect
          options={[]}
          getOptionLabel={(option) => option}
          renderTags={(selected, getTagProps) =>
            selected?.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option}
                label={option}
                size="small"
                color="info"
                variant="soft"
              />
            ))
          }
        />

        <Field.MultiSelect
          name="tags"
          label="Tags"
          options={_tags.map((tag) => ({ value: tag, label: tag }))}
        />

        <Field.Text name="description" label="Description" multiline rows={4} />
        <Field.Text name="special_offers" label="Special Offers" multiline rows={2} />

        {/* Business Hours - Simplified for this example */}
        <Field.Text
          name="business_hours"
          label="Business Hours (JSON format)"
          multiline
          rows={4}
          helperText="Enter business hours in JSON format"
        />

        {/* Category-specific fields */}
        {renderCategoryFields()}

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Business Photos</Typography>
          <Field.Upload
            name="business_photos"
            multiple
            thumbnail
            maxSize={2048 * 1024}
            accept="image/*"
            onUpload={(files) => setValue('business_photos', files)}
            onRemove={handleRemoveFile}
            onRemoveAll={handleRemoveAllFiles}
          />
        </Stack>
      </Stack>
    </Card>
  );

  const renderActions = (
    <Stack
      spacing={3}
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
      flexWrap="wrap"
    >
      <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
        {!currentBusiness ? 'Create Business' : 'Save Changes'}
      </LoadingButton>
    </Stack>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        {renderDetails}
        {renderActions}
      </Stack>
    </Form>
  );
}
