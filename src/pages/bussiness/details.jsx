import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { useGetmsnGuestProduct } from 'src/actions/product';

import { MSNProductSDetailsView } from 'src/sections/bussiness/view/product-details-view';

// ----------------------------------------------------------------------

const metadata = { title: `Business details - ${CONFIG.appName}` };

export default function Page() {
  const { id = '' } = useParams();

  const { product, productLoading, productError } = useGetmsnGuestProduct(id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <MSNProductSDetailsView product={product} loading={productLoading} error={productError} />
    </>
  );
}
