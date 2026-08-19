
import { useCallback, useState } from "react";

export default function useFetch() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const request = useCallback(async (endpoint, options = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(endpoint, options);
      const contentType = response.headers.get("content-type") || "";
      const responseData = contentType.includes("application/json")
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        throw new Error(responseData?.message || "Something went wrong. Please try again.");
      }

      setData(responseData);
      return responseData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, request };
}
