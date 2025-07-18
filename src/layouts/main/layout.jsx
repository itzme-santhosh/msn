import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';

import { usePathname } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { Logo } from 'src/components/logo';

import { Main } from './main';
import { Footer } from './footer';
import { NavMobile } from './nav/mobile';
import { NavDesktop } from './nav/desktop';
import { MenuButton } from '../components/menu-button';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';
import { LogInButton } from '../components/login-button';
import { navData as mainNavData } from '../config-nav-main';
import { SignInButton } from '../components/sign-in-button';

// ----------------------------------------------------------------------

export function MainLayout({ sx, data, children, header }) {
  const theme = useTheme();

  const pathname = usePathname();

  const mobileNavOpen = useBoolean();

  const homePage = pathname === '/';

  const layoutQuery = 'md';

  const navData = data?.nav ?? mainNavData;

  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          sx={{
            background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)', // Soft gradient background
            ...header?.sx,
          }}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
            leftArea: (
              <>
                {/* -- Nav mobile -- */}
                <MenuButton
                  onClick={mobileNavOpen.onTrue}
                  sx={{
                    mr: 1,
                    ml: -1,
                    [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
                  }}
                />
                <NavMobile
                  data={navData}
                  open={mobileNavOpen.value}
                  onClose={mobileNavOpen.onFalse}
                />
                {/* -- Logo -- */}
                <Logo />
              </>
            ),
            rightArea: (
              <>
                {/* -- Nav desktop -- */}
                <NavDesktop
                  data={navData}
                  sx={{
                    display: 'none',
                    [theme.breakpoints.up(layoutQuery)]: { mr: 2.5, display: 'flex' },
                  }}
                />

                <Box
                  display="flex"
                  alignItems="center"
                  gap={{ xs: 0.75, sm: 0.75, md: 1.5, lg: 2.5 }}
                >
                  {/* <GlobalSearch /> */}

                  {/* -- Settings button -- */}
                  {/* <SettingsButton /> */}
                  {/* -- Sign in button -- */}
                  <SignInButton />
                  <LogInButton />
                </Box>
              </>
            ),
          }}
        />
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={<Footer layoutQuery={layoutQuery} />}
      /** **************************************
       * Style
       *************************************** */
      sx={sx}
    >
      <Main>{children}</Main>
    </LayoutSection>
  );
}
