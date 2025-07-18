import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import BusinessList from 'src/sections/bussiness/business-list';

// ----------------------------------------------------------------------

const metadata = { title: `Business list - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <BusinessList />
    </>
  );
}
