import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints, backendFetcher, backendAxiosInstance } from 'src/utils/axios';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

// ----------------------------------------------------------------------

export function useGetProducts() {
  const url = endpoints.product.list;

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      products: data?.products || [],
      productsLoading: isLoading,
      productsError: error,
      productsValidating: isValidating,
      productsEmpty: !isLoading && !data?.products.length,
    }),
    [data?.products, error, isLoading, isValidating]
  );

  return memoizedValue;
}
// ----------------------------------------------------------------------

export function useGetmsnProducts(params = {}) {
  const {
    pageIndex = 0,
    pageSize = 10,
    columnFilters = [],
    globalFilter = '',
    sorting = [],
  } = params;

  // Convert pageIndex to page number (pageIndex is 0-based, backend expects 1-based)
  const page = pageIndex + 1;

  // Build query parameters
  const queryParams = new URLSearchParams({
    page: page.toString(),
    per_page: pageSize.toString(),
  });

  // Add global filter (search)
  if (globalFilter) {
    queryParams.append('search', globalFilter);
  }

  // Add column filters
  columnFilters.forEach((filter) => {
    if (filter.value) {
      queryParams.append(`filter[${filter.id}]`, filter.value);
    }
  });

  // Add sorting
  if (sorting.length > 0) {
    const sortField = sorting[0].id;
    const sortDirection = sorting[0].desc ? 'desc' : 'asc';
    queryParams.append('sort_by', sortField);
    queryParams.append('sort_direction', sortDirection);
  }

  const url = `${endpoints.msnproduct.table}?${queryParams.toString()}`;

  const { data, isLoading, error, isValidating, mutate } = useSWR(url, backendFetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      products: data || { data: [], total: 0 },
      productsLoading: isLoading,
      productsError: error,
      productsValidating: isValidating,
      productsEmpty: !isLoading && (!data?.data || data?.data.length === 0),
      refetch: () => mutate(),
      totalRowCount: data?.total || 0,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetGuestmsnProducts(page = 1, pageSize = 10, category = '') {
  const queryParams = new URLSearchParams({
    page: String(page),
    per_page: String(pageSize),
    ...(category && { category }),
  });

  const url = `${endpoints.guest.list}?${queryParams.toString()}`;

  const { data, isLoading, error, isValidating, mutate } = useSWR(url, backendFetcher, {
    keepPreviousData: true,
    ...swrOptions,
  });

  const memoizedValue = useMemo(
    () => ({
      products: {
        data: data?.data || [],
        current_page: data?.current_page || 1,
        per_page: data?.per_page || pageSize,
        total: data?.total || 0,
        last_page: data?.last_page || 1,
      },
      productsLoading: isLoading,
      productsError: error,
      productsValidating: isValidating,
      productsEmpty: !isLoading && (!data?.data || data?.data.length === 0),
      refetch: () => mutate(),
    }),
    [data, error, isLoading, isValidating, mutate, pageSize]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
export function useGetProduct(productId) {
  const url = productId ? [endpoints.product.details, { params: { productId } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      product: data?.product,
      productLoading: isLoading,
      productError: error,
      productValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetmsnProduct(id) {
  const url = id ? [endpoints.msnproduct.details, { params: { id } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(url, backendFetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      product: data,
      productLoading: isLoading,
      productError: error,
      productValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetmsnGuestProduct(id) {
  const url = endpoints.guest.details(id);

  const { data, isLoading, error, isValidating } = useSWR(url, backendFetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      product: data,
      productLoading: isLoading,
      productError: error,
      productValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchProducts(query) {
  const url = query ? [endpoints.product.search, { params: { query } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.results || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !data?.results.length,
    }),
    [data?.results, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function deleteProduct(id) {
  const url = endpoints.msnproduct.delete;
  await backendAxiosInstance.delete(url, { params: { id } });
}
export async function createProduct(data) {
  const url = endpoints.msnproduct.create;
  const headers = { 'Content-Type': 'multipart/form-data' };

  await backendAxiosInstance.post(url, data, { headers });
}
export async function editProduct(id, data) {
  const url = endpoints.msnproduct.edit(id);
  const headers = { 'Content-Type': 'multipart/form-data', 'X-HTTP-Method-Override': 'PUT' };

  await backendAxiosInstance.post(url, data, { headers });
}
