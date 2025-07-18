import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { MSNProductNewEditForm } from 'src/sections/product/msnproduct-new-edit-form';

// ----------------------------------------------------------------------

export function BussinessCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Create new"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Bussiness', href: paths.dashboard.bussiness.root },
          { name: 'New Business' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <MSNProductNewEditForm />
    </DashboardContent>
  );
}
