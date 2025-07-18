import { paths } from 'src/routes/paths';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export const navData = [
  { title: 'Home', path: '/', icon: <Iconify width={22} icon="solar:home-2-bold-duotone" /> },
  {
    title: 'Businesses',
    path: paths.bussiness.root,
    icon: <Iconify width={22} icon="solar:home-2-bold-duotone" />,
  },
  // {
  //   title: 'Components',
  //   path: paths.components,
  //   icon: <Iconify width={22} icon="solar:atom-bold-duotone" />,
  // },
  {
    title: 'Services',
    path: '/pages',
    icon: <Iconify width={22} icon="solar:file-bold-duotone" />,
    children: [
      {
        subheader: 'Home Care',
        items: [
          { title: 'Lawn', path: '' },
          { title: 'Appliances', path: '' },
          { title: 'Landscaping', path: '' },
          { title: 'Lighting', path: '' },
          { title: 'Electrical', path: '' },
          { title: 'Plumping', path: '' },
          { title: 'HVAC', path: '' },
          { title: 'Pest Control', path: '' },
          { title: 'Painting', path: '' },
          { title: 'Handyman', path: '' },
          { title: 'Cleaning', path: '' },
          { title: 'Flooring', path: '' },
          { title: 'Decor', path: '' },
          { title: 'Cabinets', path: '' },
          { title: 'Closets', path: '' },
        ],
      },
      {
        subheader: 'Food',
        items: [
          { title: 'Catering', path: '' },
          { title: 'Delivery', path: '' },
          { title: 'Pickup', path: '' },
          { title: 'Sweets and Snacks', path: '' },
          { title: 'Restaurants', path: '' },
          { title: 'Groceries', path: '' },
        ],
      },
      {
        subheader: 'Kids',
        items: [
          { title: 'Vocal', path: '' },
          { title: 'Dance', path: '' },
          { title: 'Instruments', path: '' },
          { title: 'Academic', path: '' },
          { title: 'Party', path: '' },
          { title: 'College Prep', path: '' },
        ],
      },
      {
        subheader: 'Finance',
        items: [
          { title: 'Taxes', path: '' },
          { title: 'Financial Planning', path: '' },
          { title: 'Will and Trust', path: '' },
          { title: 'Insurance', path: '' },
          { title: 'India Finances', path: '' },
          { title: 'Real Estate', path: '' },
          { title: 'Property Management', path: '' },
          { title: 'Rental Property', path: '' },
        ],
      },
    ],
  },
  // { title: 'Contact Us', path: paths.contact, icon: <Iconify width={22} icon="solar:home-2-bold-duotone" /> },

  // {
  //   title: 'Docs',
  //   icon: <Iconify width={22} icon="solar:notebook-bold-duotone" />,
  //   path: paths.docs,
  // },
];
