import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { useGetmsnProduct } from 'src/actions/product';

import { BusinessDetailsSummary } from 'src/sections/bussiness/business-details';

// ----------------------------------------------------------------------

const metadata = { title: `Business details - ${CONFIG.appName}` };

export default function Page() {
  const { id = '' } = useParams();

  const { product, productLoading, productError } = useGetmsnProduct(id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <BusinessDetailsSummary product={product} loading={productLoading} error={productError} />
    </>
  );
}
