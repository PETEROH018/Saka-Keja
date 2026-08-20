import { useEffect, useState } from "react";

export default function useFetch(endpoint, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(endpoint, {
          ...options,
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Something went wrong. Please try again.");
        }

        const result = await response.json();

        setData(result);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [endpoint]);

  return {
    data,
    loading,
    error,
  };
}