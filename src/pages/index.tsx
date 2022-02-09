import React, { useCallback, useState } from "react";
import { GetStaticProps, NextPage } from "next";
import { useFetch } from "src/components/pagination/useFetch";
import { useScrollThreshold } from "src/components/pagination/useScrollThreshold";
import { loadTranslation } from "../shared/utils";
import { ListItem } from "../components/list-item";
import { List } from "../components/pagination";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadTranslation(ctx.locale!, process.env.NODE_ENV === "production");
  return {
    props: {
      translation,
    },
  };
};


/* custom fetcher with access

const fetcher = (url: string, token: string) =>
  axios.get(url, { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.json());

const { data, error, mutate, size, setSize, isValidating }: any = useSWRInfinite(
    (index: number) => [
      `https://dev-api.megapolis-it.ru/pts/Stop/version?isActive=true&pageSize=${PAGE_SIZE}&pageNum=${index + 1}`,
      accessToken,
    ],
    fetcher,
);
*/
type Item = {
  id: number
} & { [key: string]: any };

const pageSize = 3;

const fetchFn = (params: { page: number }): Promise<{ data: Item[], total_pages: number }> =>
  fetch(`https://reqres.in/api/users?per_page=${pageSize}&page=${params.page || 1}`)
    .then((res) => res.json());

const Index: NextPage = () => {
  const [ data, setData ] = useState<any[]>([]);
  const [ page, setPage ] = useState<number>(1);
  const [ hasNextPage, setHasNextPage] = useState(false);

  const callback = useCallback((res: { data: Item[], total_pages: number }, params: { page: number }) => {
    setData(_data => [..._data, ...res.data]);
    setPage(params?.page || 1);
    setHasNextPage((params?.page || 1) < res.total_pages);
  }, []);


  const { isLoading, error, fetchMore } = useFetch<{ data: Item[], total_pages: number }, undefined, { page: number }>({
    fetcher: fetchFn,
    callback,
    options: undefined,
  });

  const onThreshold = useCallback(() => {
    fetchMore({ page: page + 1 });
  }, [ fetchMore, page ]);

  useScrollThreshold({ onThreshold: !isLoading && hasNextPage ? onThreshold : null });

  // const { size, isLoadingMore, issues, isRefreshing, mutate, setSize, isEmpty, hasNext, isReachingEnd } =
  //   useInfiniteLogic({
  //     URLHandler: (index, previousPageData) => {
  //       return `https://reqres.in/api/users?per_page=${pageSize}&page=${index + 1}`;
  //     },
  //     customFetcher: undefined,
  //     pageSize,
  //   });

  return (
    <div>
      <div style={{ height: 50 }} />
      <div style={{ height: 40, position: "fixed", backgroundColor: "paleturquoise", top: 0 }}>
        <div>
          страница {page}; элементов {isLoading ? "..." : data.length}
        </div>
        <button disabled={!hasNextPage} onClick={() => setPage(1)}>
          Почистить
        </button>
      </div>

      <List
        data={data}
        isEmpty={data.length === 0}
        classNameWrapper="PaginationWrapper"
        isEmptyPlaceholder={<div>Здесь пусто :(</div>}
        renderItem={(item) => <ListItem id={item.id} email={item.email} />}
      />
    </div>
  );
};

export default Index;
