import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    subheader: 'Overview',
    items: [
      {
        title: 'App',
        path: paths.dashboard.root,
        icon: ICONS.dashboard,
        permissions: ['admin', 'business', 'customer'],
      },
      // {
      //   title: 'Booking',
      //   path: paths.dashboard.general.booking,
      //   icon: ICONS.booking,
      //   permissions: ['admin', 'business', 'customer'],
      // },
    ],
  },
  /**
   * Management
   */
  {
    subheader: 'Management',
    items: [
      {
        title: 'User',
        path: paths.dashboard.user.root,
        icon: ICONS.user,
        permissions: ['admin'],
        children: [
          {
            title: 'List',
            path: paths.dashboard.user.list,
            permissions: ['admin'],
          },
          {
            title: 'Create',
            path: paths.dashboard.user.new,
            permissions: ['admin'],
          },
        ],
      },
      {
        title: 'Bussiness',
        path: paths.dashboard.bussiness.root,
        icon: ICONS.user,
        permissions: ['admin', 'business'],
        children: [
          {
            title: 'List',
            path: paths.dashboard.bussiness.list,
            permissions: ['admin', 'business'],
          },
          {
            title: 'Create',
            path: paths.dashboard.bussiness.new,
            permissions: ['admin', 'business'],
          },
        ],
      },
      { title: 'Change Password', path: paths.dashboard.user.account, icon: ICONS.lock },
    ],
  },
];
