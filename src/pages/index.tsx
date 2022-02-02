import { GetStaticProps, NextPage } from "next";
import { loadTranslation } from "../shared/utils";
import { ListItem } from "../components/list-item";
import useSWRInfinite from "swr/infinite";
import { Pagination } from "../components/pagination";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadTranslation(ctx.locale!, process.env.NODE_ENV === "production");
  return {
    props: {
      translation,
    },
  };
};

// const { onEndReached, data, loading, error } = useDataLoad({
//   url: (d: any) => "string",
//   initialOptions: () => ({headers: {}, params: {}}),
//   onMoreOptions: ({ headers, params }) =>  ({params: {...params, more: params.page + 1}, headers }),
//   onMore: (prevData, data) => {
//   merge данных
//
//     return {финальная дата}
//   },
// });

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

const PAGE_SIZE = 3;

const fetcher = (url) => fetch(url).then((res) => res.json());

const Index: NextPage = () => {
  const { data, error, mutate, size, setSize, isValidating }: any = useSWRInfinite(
    (index: number) => [`https://reqres.in/api/users?per_page=${PAGE_SIZE}&page=${index + 1}`],
    fetcher,
  );

  let issues = [];
  data && data.forEach((item) => ("data" in item ? (issues = [...issues, ...item.data]) : null));

  const isLoadingInitialData = !data && !error;
  const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.data.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.data.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data.length === size;
  const hasNext = data ? size < data[0]?.total_pages : false;

  console.log(111222, !isRefreshing, !isLoadingMore, hasNext);

  return (
    <div>
      <div style={{ height: 50 }} />
      <div style={{ height: 40, position: "fixed", backgroundColor: "paleturquoise", top: 0 }}>
        страница {size}; элементов {isLoadingMore ? "..." : issues.length}
        <button disabled={isRefreshing} onClick={() => mutate()}>
          {isRefreshing ? "Обновление..." : "Обновить"}
        </button>
        <button disabled={!size} onClick={() => setSize(0)}>
          Почистить
        </button>
      </div>

      <Pagination
        data={issues}
        isEmpty={isEmpty}
        hasNext={hasNext}
        isLoading={isRefreshing || isLoadingMore}
        classNameWrapper="PaginationWrapper"
        onEndReached={({ isLoading, hasNext }) => {
          console.log(111222, { isLoading, hasNext });
          if (!isLoading && hasNext) {
            setSize(size + 1);
          }
        }}
        isEmptyPlaceholder={<div>Здесь пусто :(</div>}
        renderItem={(item) => {
          return <ListItem id={item.id} email={item.email} />;
        }}
      />

      <div>
        <button disabled={isLoadingMore || isReachingEnd} onClick={() => setSize(size + 1)}>
          {isLoadingMore ? "Загрузка..." : isReachingEnd ? "Элементов больше нет" : "Далее"}
        </button>
      </div>
    </div>
  );
};

export default Index;
