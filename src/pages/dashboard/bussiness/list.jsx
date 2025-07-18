import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { BussinessListView } from 'src/sections/bussiness/view';

// ----------------------------------------------------------------------

const metadata = { title: `Bussiness list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <BussinessListView />
    </>
  );
}
