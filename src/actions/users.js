import useSWR from 'swr';
import { useMemo } from 'react';

import { endpoints, backendFetcher, backendAxiosInstance } from 'src/utils/axios';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetUsers(page = 1, perPage = 10) {
  const url = `${endpoints.user.list}?page=${page}&per_page=${perPage}`;

  const { data, isLoading, error, isValidating, mutate } = useSWR(url, backendFetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      users: data?.users || [],
      userssLoading: isLoading,
      usersError: error,
      usersValidating: isValidating,
      usersEmpty: !isLoading && !data?.users.length,
      refetch: () => mutate(),
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

export function useGetUser(id) {
  const url = endpoints.user.details(id);

  const { data, isLoading, error, isValidating } = useSWR(url, backendFetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      user: data?.user,
      userLoading: isLoading,
      userError: error,
      userValidating: isValidating,
    }),
    [data?.user, error, isLoading, isValidating]
  );

  return memoizedValue;
}
export async function createUser(data) {
  const url = endpoints.user.create;
  await backendAxiosInstance.post(url, data);
}
export async function editUser(id, data) {
  const url = endpoints.user.edit(id);
  await backendAxiosInstance.put(url, data);
}

export async function deleteUser(id) {
  const url = endpoints.user.delete(id);
  await backendAxiosInstance.delete(url, { params: { id } });
}

export async function updatePassword(data) {
  const url = endpoints.user.changePassword;

  const response = await backendAxiosInstance.post(url, data);
  return response;
}
