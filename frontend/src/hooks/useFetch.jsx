
import { useCallback, useState } from "react";

export default function useFetch(endpoint, options) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const controller = new AbortController()

  try {
      fetch(endpoint,{signal: controller.signal, ...options})
      .then(r => {
        if (!r.ok) {
        throw new Error(r.message || "Something went wrong. Please try again.");
      }
      return r
      })
      .then(data => {
        setData(data.json())
      })

    } catch (err) {
      setError(err.message);
      throw requestError;
    } finally {
        setLoading(false)
    } 

    return {data, loading, error}
}
