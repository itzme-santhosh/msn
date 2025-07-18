import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { useGetmsnProducts } from 'src/actions/product';

import { ProductShopView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

const metadata = { title: `Product shop - ${CONFIG.appName}` };

export default function Page() {
  const { products, productsLoading } = useGetmsnProducts();

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ProductShopView products={products?.data} loading={productsLoading} />
    </>
  );
}
