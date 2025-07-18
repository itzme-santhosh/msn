import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { Carousel, useCarousel, CarouselArrowBasicButtons } from 'src/components/carousel';

// ----------------------------------------------------------------------

export function NewNoteworthy({ title, list, sx, ...other }) {
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
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button
          size="large"
          color="inherit"
          variant="outlined"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={24} />}
          sx={{ mx: 'auto' }}
        >
          View All
        </Button>
      </Box>
    </Container>
  );
}

// ----------------------------------------------------------------------

function CarouselItem({ item, sx, ...other }) {
  const renderImage = (
    <Box sx={{ px: 1.5, pt: 1.5 }}>
      <Image alt={item.title} src={item.coverUrl} ratio="4/4" sx={{ borderRadius: 1.2 }} />
    </Box>
  );

  return <Card>{renderImage}</Card>;
}
