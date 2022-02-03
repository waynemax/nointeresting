import { GetStaticProps, NextPage } from "next";
import { loadTranslation } from "../shared/utils";
import { ListItem } from "../components/list-item";
import { Pagination } from "../components/pagination";
import { useInfiniteLogic } from "../components/pagination/useInfiniteLogic";

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

const pageSize = 3;

const Index: NextPage = () => {
  const { size, isLoadingMore, issues, isRefreshing, mutate, setSize, isEmpty, hasNext, isReachingEnd } =
    useInfiniteLogic({
      URLHandler: (index, previousPageData) => {
        return `https://reqres.in/api/users?per_page=${pageSize}&page=${index + 1}`;
      },
      customFetcher: undefined,
      pageSize,
    });

  return (
    <div>
      <div style={{ height: 50 }} />
      <div style={{ height: 40, position: "fixed", backgroundColor: "paleturquoise", top: 0 }}>
        <div>
          страница {size}; элементов {isLoadingMore ? "..." : issues.length}
        </div>
        <button disabled={isRefreshing} onClick={() => mutate()}>
          {isRefreshing ? "Обновление..." : "Обновить"}
        </button>
        <button disabled={!size} onClick={() => setSize(1)}>
          Почистить
        </button>
      </div>

      <Pagination
        data={issues}
        isEmpty={isEmpty}
        classNameWrapper="PaginationWrapper"
        isEmptyPlaceholder={<div>Здесь пусто :(</div>}
        renderItem={(item) => <ListItem id={item.id} email={item.email} />}
        onEndReached={() => {
          if (!isRefreshing && !isLoadingMore && hasNext) setSize(size + 1);
        }}
      />

      <div>
        <button disabled={isLoadingMore || isReachingEnd || !hasNext} onClick={() => setSize(size + 1)}>
          {isLoadingMore ? "Загрузка..." : isReachingEnd || !hasNext ? "Элементов больше нет" : "Далее"}
        </button>
      </div>
    </div>
  );
};

export default Index;
