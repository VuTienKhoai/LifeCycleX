import { useEffect, useState } from "react";

export function useDelayLoading(loading: boolean, delay = 500) {
  const [delayedLoading, setDelayedLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (loading) {
      setDelayedLoading(true);
    } else {
      timer = setTimeout(() => setDelayedLoading(false), delay);
    }
    return () => clearTimeout(timer);
  }, [loading, delay]);

  return delayedLoading;
}
