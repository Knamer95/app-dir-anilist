import { useEffect, useState } from "react";

import { GetGQLPayload } from "@/anilist-api";

// TODO-mk - This is kinda dirty right now, look for better approaches, returning more
// data and setting it all in a state (response, setResponse), rather than having multiple
// That way, there won't be unnecessary race conditions, and we will be able to return more
// data (with spread syntax most likely), rather than limiting it

type FetchData<T extends Record<string, unknown>> = {
  query: (data: GetGQLPayload) => Promise<{
    data: T[];
    hasMore: boolean;
  }>;
  queryData: GetGQLPayload;
  onSuccess?: () => void;
  deps: unknown[];
};

export const useFetch = <T extends Record<string, unknown>>(
  options: FetchData<T>,
) => {
  const { query, queryData, deps, onSuccess } = options;
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    query(queryData).then((result) => {
      setData(result.data);
      setHasMore(result.hasMore);
      setLoading(false);

      if (typeof onSuccess === "function") onSuccess();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return {
    loading,
    setLoading,
    data,
    hasMore,
  };
};
