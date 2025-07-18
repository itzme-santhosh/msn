import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { BussinessCreateView } from 'src/sections/bussiness/view';

// ----------------------------------------------------------------------

const metadata = { title: `Create a new user | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <BussinessCreateView />
    </>
  );
}
