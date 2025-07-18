// utils/formDataPreparation.js
export const prepareFormData = (data) => {
  const formData = new FormData();

  // Basic string fields
  formData.append('business_name', data.business_name || '');
  formData.append('owner_name', data.owner_name || '');
  formData.append('email', data.email || '');
  formData.append('mobile_phone', data.mobile_phone || '');
  formData.append('category', data.category || '');
  formData.append('whatsapp_group', data.whatsapp_group || '');
  formData.append('instagram_handle', data.instagram_handle || '');
  formData.append('website', data.website || '');
  formData.append('business_description', data.business_description || '');
  formData.append('special_offers', data.special_offers || '');
  formData.append('business_hours', data.business_hours || '');

  // Boolean fields as integers
  formData.append('is_verified', data.is_verified ? 1 : 0);
  formData.append('is_insured', data.is_insured ? 1 : 0);
  formData.append('delivery_available', data.delivery_available ? 1 : 0);

  // Array and object fields - JSON stringify
  if (data.areas_served && Array.isArray(data.areas_served)) {
    formData.append('areas_served', JSON.stringify(data.areas_served));
  } else {
    formData.append('areas_served', JSON.stringify([]));
  }

  if (data.tags && Array.isArray(data.tags)) {
    formData.append('tags', JSON.stringify(data.tags));
  } else {
    formData.append('tags', JSON.stringify([]));
  }

  // Business photos
  if (data.business_photos && Array.isArray(data.business_photos)) {
    data.business_photos.forEach((file) => {
      if (file instanceof File) {
        formData.append('business_photos[]', file);
      }
    });
  }

  // Category-specific fields
  if (data.category === 'food') {
    // Menu items as JSON
    if (data.menu_items && Array.isArray(data.menu_items)) {
      formData.append('menu', JSON.stringify(data.menu_items));
    } else {
      formData.append('menu', JSON.stringify([]));
    }

    // Delivery pricing as JSON
    if (data.delivery_pricing) {
      formData.append('delivery_pricing', JSON.stringify(data.delivery_pricing));
    } else {
      formData.append('delivery_pricing', JSON.stringify({}));
    }
  }

  if (['kids', 'home', 'finance'].includes(data.category)) {
    // Pricing object as JSON
    if (data.pricing) {
      formData.append('pricing', JSON.stringify(data.pricing));
    }

    // Availability as JSON if it's an array
    if (data.availability) {
      formData.append('availability', JSON.stringify(data.availability));
    }
  }

  // Debug helper
  const formDataObj = {};
  formData.forEach((value, key) => {
    formDataObj[key] = value;
  });
  console.log('Form Data:', formDataObj);

  return formData;
};
