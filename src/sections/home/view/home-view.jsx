import Stack from '@mui/material/Stack';
import { Box, CircularProgress } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { stylesMode } from 'src/theme/styles';
import { useGetGuestmsnProducts } from 'src/actions/product';
import { _foodServices, _kidsServices, _financeServices, _homeCareServices } from 'src/_mock';

import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import HomeTasks from '../home-tasks';
import { FeaturedServices } from '../features';
import { FeaturedBusiness } from '../featured-business';
import { MostSearchedServices } from '../components/most-searched-services';

export function HomeView() {
  const pageProgress = useScrollProgress();

  // Create separate queries for each category
  const { products: foodProducts, productsLoading: foodLoading } = useGetGuestmsnProducts(
    1,
    6,
    'Food'
  );
  const { products: kidsProducts, productsLoading: kidsLoading } = useGetGuestmsnProducts(
    1,
    6,
    'Kids'
  );
  const { products: homeProducts, productsLoading: homeLoading } = useGetGuestmsnProducts(
    1,
    6,
    'Home'
  );
  const { products: financeProducts, productsLoading: financeLoading } = useGetGuestmsnProducts(
    1,
    6,
    'Finance'
  );

  // Check if all data is loading
  const isLoading = foodLoading || kidsLoading || homeLoading || financeLoading;

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Helper function to determine what to display
  const renderBusinessSection = (categoryData, mockData, title) => {
    if (categoryData?.data?.length > 0) {
      return <FeaturedBusiness title={title} list={categoryData.data} />;
    }
    return <FeaturedServices title={title} list={mockData} />;
  };

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTop />

      <Stack
        sx={{
          '&::before': {
            width: 1,
            height: 1,
            zIndex: -1,
            content: "''",
            opacity: 0.24,
            position: 'fixed',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundImage: `url(${CONFIG.assetsDir}/assets/background/background-3-blur.webp)`,
            [stylesMode.dark]: { opacity: 0.08 },
          },
        }}
      >
        <HomeTasks />
        <MostSearchedServices />

        {/* Food Services */}
        {renderBusinessSection(foodProducts, _foodServices, 'Food Services')}

        {/* Home Services */}
        {renderBusinessSection(homeProducts, _homeCareServices, 'Home Care Services')}

        {/* Kids Services */}
        {renderBusinessSection(kidsProducts, _kidsServices, 'Kids Services')}

        {/* Financial Services */}
        {renderBusinessSection(financeProducts, _financeServices, 'Financial Services')}
      </Stack>
    </>
  );
}
