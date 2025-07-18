import React, { useRef, useState, useEffect } from 'react';
import { Hits, Configure, InstantSearch } from 'react-instantsearch';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { styled, useTheme } from '@mui/material/styles';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import {
  Box,
  List,
  Fade,
  Paper,
  Button,
  Popper,
  Divider,
  ListItem,
  TextField,
  Container,
  Typography,
  IconButton,
  useMediaQuery,
  ListItemButton,
  InputAdornment,
  ClickAwayListener,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';

// Initialize MeiliSearch client
const { searchClient } = instantMeiliSearch(CONFIG.search.meiliHost, CONFIG.search.meiliApiKey);

const SearchWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: '800px',
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    padding: theme.spacing(0, 1),
  },
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.5),
  transition: 'all 0.2s ease',
}));

const SearchTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.paper,
    transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color']),
    '& fieldset': {
      borderColor: theme.palette.divider,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      borderWidth: '2px',
    },
  },
  '& .MuiInputBase-input': {
    height: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1.5),
    },
  },
}));

const ResultsPopper = styled(Popper)(({ theme }) => ({
  width: 'var(--search-width)',
  zIndex: theme.zIndex.modal + 1,
  marginTop: theme.spacing(0.5),
  [theme.breakpoints.down('sm')]: {
    position: 'fixed !important',
    left: `${theme.spacing(1)} !important`,
    right: theme.spacing(1),
    width: `calc(100% - ${theme.spacing(2)}) !important`,
  },
}));

const ResultsPaper = styled(Paper)(({ theme }) => ({
  maxHeight: '400px',
  overflow: 'auto',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[8],
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.down('sm')]: {
    maxHeight: '60vh',
  },
  '& .MuiList-root': {
    padding: 0,
  },
}));

const BusinessHit = ({ hit }) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClick = () => {
    router.push(paths.bussiness.details(hit.id));
  };

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          onClick={handleClick}
          sx={{
            transition: 'background-color 0.2s ease',
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
            py: 2,
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? 2 : 0,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 0.5 }}>
                  {hit.business_name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocalPhoneIcon sx={{ fontSize: '0.9rem', color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {hit.mobile_phone || 'N/A'}
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                color="success"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick();
                }}
                sx={{
                  borderRadius: '20px',
                  textTransform: 'none',
                  px: 3,
                  whiteSpace: 'nowrap',
                  width: isMobile ? '100%' : 'auto',
                }}
              >
                Contact Now
              </Button>
            </Box>
          </Box>
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
};

const HomeTasks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const searchRef = useRef(null);
  const containerRef = useRef(null);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const updateSearchWidth = () => {
    if (containerRef.current) {
      const { width } = containerRef.current.getBoundingClientRect();
      document.documentElement.style.setProperty('--search-width', `${width}px`);
    }
  };

  useEffect(() => {
    updateSearchWidth();
    const resizeObserver = new ResizeObserver(updateSearchWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, []);

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    setNoResults(false);
    setIsOpen(value.length >= 1);
  };

  const handleClear = () => {
    setSearchTerm('');
    setIsOpen(false);
    setNoResults(false);
    searchRef.current?.focus();
  };

  const handleClickAway = () => {
    setIsOpen(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" align="center" sx={{ fontWeight: 'bold', mb: 4 }}>
        Book trusted help for home tasks
      </Typography>

      <ClickAwayListener onClickAway={handleClickAway}>
        <SearchWrapper>
          <SearchContainer ref={containerRef}>
            <InstantSearch searchClient={searchClient} indexName={CONFIG.search.meiliIndex}>
              <Configure
                hitsPerPage={10}
                query={searchTerm}
                attributesToHighlight={['business_name', 'description']}
              />
              <SearchTextField
                inputRef={searchRef}
                value={searchTerm}
                onChange={handleSearch}
                placeholder="What do you need help with?"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        color="action"
                        sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={handleClear}
                        size={isMobile ? 'small' : 'medium'}
                        sx={{ mr: -0.5 }}
                      >
                        <ClearIcon sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <ResultsPopper
                open={isOpen}
                anchorEl={containerRef.current}
                placement={isMobile ? 'bottom' : 'bottom-start'}
                transition
                modifiers={[
                  {
                    name: 'preventOverflow',
                    enabled: true,
                    options: {
                      boundary: 'viewport',
                    },
                  },
                ]}
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={200}>
                    <ResultsPaper elevation={8}>
                      <List disablePadding>
                        <Hits
                          hitComponent={({ hit }) => <BusinessHit hit={hit} />}
                          transformItems={(items) => {
                            setNoResults(items.length === 0);
                            return items;
                          }}
                        />
                        {noResults && searchTerm && (
                          <Box sx={{ p: 2, textAlign: 'center' }}>
                            <Typography
                              variant={isMobile ? 'body2' : 'body1'}
                              color="text.secondary"
                            >
                              No results found for &ldquo;{searchTerm}&rdquo;
                            </Typography>
                          </Box>
                        )}
                      </List>
                    </ResultsPaper>
                  </Fade>
                )}
              </ResultsPopper>
            </InstantSearch>
          </SearchContainer>
        </SearchWrapper>
      </ClickAwayListener>
    </Container>
  );
};

export default HomeTasks;
