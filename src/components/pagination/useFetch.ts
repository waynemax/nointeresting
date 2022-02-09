import { useCallback, useEffect, useState } from "react";

interface Props<T, O, P> {
  callback: (response: T, params?: P) => void,
  fetcher: (props: O & P | O) => Promise<T>
  options: O
}

export const useFetch = <T, O, P>(props: Props<T, O, P>) => {
  const { callback, fetcher, options } = props;
  const [ isLoading, setIsLoading] = useState(false);
  const [ error, setError ] = useState<Error>();

  const fetchHandler = useCallback(async (params?: P) => {
    try {
      setIsLoading(true);
      const data = await fetcher({ ...options, ...params });

      callback(data, params);
      setIsLoading(false);

    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  }, [ fetcher, options, callback ]);

  /** Initial loading */
  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  const fetchMore = useCallback((params: P) => {
    fetchHandler(params);
  }, [ fetchHandler ]);

  return { isLoading, fetchMore, error };
};
