import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { MSNProductNewEditForm } from 'src/sections/product/msnproduct-new-edit-form';

// ----------------------------------------------------------------------

export function BussinessEditView({ currentProduct }) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Business', href: paths.dashboard.bussiness.root },
          { name: currentProduct?.business_name },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <MSNProductNewEditForm currentBusiness={currentProduct} />
    </DashboardContent>
  );
}
