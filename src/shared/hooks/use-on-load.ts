import { useEffect, useState } from "react";

export const useOnLoad = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  }, []);

  return { isLoaded };
};
