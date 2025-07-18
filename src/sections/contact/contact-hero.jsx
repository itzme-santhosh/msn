import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/config-global';
import { varAlpha, bgGradient } from 'src/theme/styles';

import { varFade, AnimateText, MotionContainer, animateTextClasses } from 'src/components/animate';

// ----------------------------------------------------------------------

const CONTACTS = [
  {
    country: 'Austin - Downtown',
    address: '123 Main St, Downtown Austin, TX',
    phoneNumber: '123-456-7890',
  },
  {
    country: 'Austin - South Congress',
    address: '123 Main St, South Congress, TX',
    phoneNumber: '123-456-7890',
  },
  {
    country: 'Austin - Avery Ranch',
    address: '123 Main St, Avery Ranch, TX',
    phoneNumber: '123-456-7890',
  },
  {
    country: 'Austin - Arboretum',
    address: '123 Main St, Arboretum, TX',
    phoneNumber: '123-456-7890',
  },
];

// ----------------------------------------------------------------------

export function ContactHero({ sx, ...other }) {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        ...bgGradient({
          color: `0deg, ${varAlpha(theme.vars.palette.grey['900Channel'], 0.8)}, ${varAlpha(theme.vars.palette.grey['900Channel'], 0.8)}`,
          imgUrl: `${CONFIG.assetsDir}/assets/images/contact/hero.webp`,
        }),
        height: { md: 560 },
        py: { xs: 10, md: 0 },
        overflow: 'hidden',
        position: 'relative',
        ...sx,
      }}
      {...other}
    >
      <Container component={MotionContainer}>
        <Box
          sx={{
            bottom: { md: 80 },
            position: { md: 'absolute' },
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          <AnimateText
            component="h1"
            variant="h1"
            text={['Where', 'to find us?']}
            variants={varFade({ distance: 24 }).inUp}
            sx={{
              color: 'common.white',
              [`& .${animateTextClasses.line}[data-index="0"]`]: {
                [`& .${animateTextClasses.word}[data-index="0"]`]: { color: 'primary.main' },
              },
            }}
          />

          <Box
            columnGap={{ xs: 2, md: 5 }}
            rowGap={{ xs: 5, md: 0 }}
            display={{ xs: 'grid', md: 'flex' }}
            gridTemplateColumns={{ xs: 'repeat(2, 1fr)' }}
            sx={{ mt: 5, color: 'common.white' }}
          >
            {CONTACTS.map((contact) => (
              <Box key={contact.country}>
                <m.div variants={varFade({ distance: 24 }).inUp}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {contact.country}
                  </Typography>
                </m.div>

                <m.div variants={varFade({ distance: 24 }).inUp}>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {contact.address}
                  </Typography>
                </m.div>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
