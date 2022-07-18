import {useCallback, useState} from 'react';

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true);
    try {
      if (body) {
        body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
        headers['AllowedHeaders'] = '*';
        headers['AllowedMethods'] = 'POST, GET, PUT, DELETE, HEAD';
      }
      const response = await fetch(url, {headers, method, body})
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error')
      }
      setLoading(false);
      return data;
    } catch (e) {
      setLoading(false);
      setError(e.message)
      throw e;
    }
  }, [])


  return {loading, request, error}
}
