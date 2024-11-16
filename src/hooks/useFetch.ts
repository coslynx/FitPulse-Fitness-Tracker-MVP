import { useState, useEffect } from 'react';
import axios from 'axios';

interface FetchOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: any;
}

const useFetch = <T>(options: FetchOptions): {
  data: T | null;
  isLoading: boolean;
  error: string | null;
} => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!options.url) {
      setError("URL is required");
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios({
          method: options.method || 'GET',
          url: options.url,
          data: options.body,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            ...options.headers,
          },
        });
        setData(response.data);
      } catch (error: any) {
        setError(error.message || 'Failed to fetch data');
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [options.url, options.method, options.body, options.headers]);

  return { data, isLoading, error };
};

export default useFetch;
```