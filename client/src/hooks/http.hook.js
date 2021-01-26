import { useState, useCallback } from "react";

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      if (body) {
        body = JSON.stringify(body);
        headers["Content-Type"] = "application/json";
      }
      try {
        const res = await fetch(url, { method, body, headers });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "An error");
        }
        setLoading(false);

        return data;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        throw error;
      }
    },
    [error]
  );

  const clearErrors = useCallback(() => {
    setError(null);
  }, []);
  return { loading, request, error, clearErrors };
};

export default useHttp;
