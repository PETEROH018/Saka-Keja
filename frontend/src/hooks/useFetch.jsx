import { useEffect, useState } from "react";

import { useEffect, useState } from "react";

export default function useFetch(endpoint, options) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(endpoint, {
          signal: controller.signal,
          ...options,
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        setData(await response.json());
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => controller.abort();
  }, [endpoint, options]);

  return { data, loading, error };
}
