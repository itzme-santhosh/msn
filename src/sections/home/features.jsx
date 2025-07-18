import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, ListItemText } from '@mui/material';

import { fCurrency, fShortenNumber } from 'src/utils/format-number';

import { maxLine } from 'src/theme/styles';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { Label, labelClasses } from 'src/components/label';
import { Carousel, useCarousel, CarouselArrowBasicButtons } from 'src/components/carousel';

// ----------------------------------------------------------------------

export function FeaturedServices({ title, list, sx, ...other }) {
  const carousel = useCarousel({
    align: 'start',
    slideSpacing: '24px',
    slidesToShow: { xs: 1, sm: 2, md: 3, lg: '35%', xl: '25%' },
  });

  return (
    <Container>
      <Box sx={sx} {...other}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 0.5,
          }}
        >
          <Typography variant="h6">{title}</Typography>
          <CarouselArrowBasicButtons {...carousel.arrows} />
        </Box>

        {/* Carousel */}
        <Carousel
          carousel={carousel}
          slotProps={{
            slide: { py: 3 },
          }}
          sx={{ px: 0.5 }}
        >
          {list.map((item) => (
            <CarouselItem key={item.id} item={item} />
          ))}
        </Carousel>

        {/* Centering the button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
          <Button
            size="large"
            color="inherit"
            variant="outlined"
            endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={24} />}
          >
            View All
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

// ----------------------------------------------------------------------

function CarouselItem({ item, sx, ...other }) {
  const renderImage = (
    <Box sx={{ px: 1.5, pt: 1.5 }}>
      <Image alt={item.title} src={item.coverUrl} ratio="4/3" sx={{ borderRadius: 1.2 }} />
    </Box>
  );

  const renderLabels = (
    <Box
      sx={{
        gap: 1,
        mb: 1,
        display: 'flex',
        flexWrap: 'wrap',
        [`& .${labelClasses.root}`]: {
          typography: 'caption',
          color: 'text.secondary',
        },
      }}
    >
      {/* <Label startIcon={<Iconify width={12} icon="solar:clock-circle-outline" />}>1h 40m</Label> */}
      <Label startIcon={<Iconify width={12} icon="solar:users-group-rounded-bold" />}>
        {fShortenNumber(item.totalStudents)}
      </Label>
    </Box>
  );

  const renderFooter = (
    <Box
      sx={{
        mt: 2,
        gap: 0.5,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <ListItemText
        primary="Starting From:"
        secondary={fCurrency(item.price)}
        primaryTypographyProps={{
          component: 'span',
          typography: 'caption',
          color: 'text.disabled',
        }}
        secondaryTypographyProps={{
          component: 'span',
          typography: 'caption',
          fontWeight: 'bold',
          fontSize: '1.1rem',
        }}
      />
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          flexGrow: 1,
        }}
      />
      <Button variant="contained" size="small">
        Book Now
      </Button>
    </Box>
  );

  return (
    <Card>
      {renderImage}
      <Box sx={{ px: 1.5, py: 2 }}>
        {renderLabels}
        <Link
          variant="subtitle2"
          color="inherit"
          underline="none"
          sx={(theme) => ({
            ...maxLine({ line: 2, persistent: theme.typography.subtitle2 }),
          })}
        >
          {item.title}
        </Link>
        {renderFooter}
      </Box>
    </Card>
  );
}
