// In your schema.js file
import { z } from 'zod';

export const CATEGORIES = [
  { value: 'Food', label: 'Food' },
  { value: 'Kids', label: 'Kids' },
  { value: 'Home', label: 'Home' },
  { value: 'Finance', label: 'Finance' },
];

export const BusinessSchema = z.object({
  business_name: z.string().min(1, 'Business name is required'),
  owner_name: z.string().min(1, 'Owner name is required'),
  email: z.string().email('Invalid email address'),
  category: z.string().min(1, 'Category is required'),
  mobile_phone: z.string().min(1, 'Mobile phone is required'),
  whatsapp_group_link: z.string().url('Invalid URL').optional().or(z.literal('')),
  instagram_handle: z.string().optional(),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  business_photos: z.array(z.any()).optional(),
  // business_hours: z.record(z.any()).optional(),
  tags: z.array(z.string()).optional(),
  description: z.string().optional(),
  special_offers: z.string().optional(),
  areas_served_cities: z.array(z.string()).optional(),
  areas_served_zipcodes: z.array(z.string()).optional(),

  // Category-specific fields (all optional)
  menu: z.string().optional(),
  food_pricing: z.string().optional(),
  catering_type: z.string().optional(),
  delivery_pricing: z.string().optional(),
  availability_calendar: z.string().optional(),
  age_range: z.string().optional(),
  activity_type: z.string().optional(),
  safety_certifications: z.string().optional(),
  staff_qualifications: z.string().optional(),
  service_type: z.string().optional(),
  pricing_model: z.string().optional(),
  // insured: z.string().optional(),
  service_guarantee: z.string().optional(),
  certifications: z.string().optional(),
  minimum_investment: z.string().optional(),
  target_clients: z.string().optional(),
});
