import { useState } from 'react';

import { endpoints, backendAxiosInstance } from 'src/utils/axios';

export function useUploadFile() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const upload = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await backendAxiosInstance.post(endpoints.business.import, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { upload, isLoading, error };
}
