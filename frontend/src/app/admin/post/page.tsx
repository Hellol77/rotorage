"use client";
import { queryKeys } from "@/apis/querykeys";
import MainContainer from "@/components/common/container/MainContainer";
import InfiniteBoardGrid from "@/components/common/grid/InfiniteBoardGrid";
import useCheckAdmin from "@/hooks/queries/admin/useCheckAdmin";
import { useGetReportedPosts } from "@/hooks/queries/admin/useGetReportedPosts";

export default function AdminPostPage() {
  const { isError, isFetching: isCheckFetching, isSuccess } = useCheckAdmin();
  const { data, fetchNextPage, isFetchingNextPage, isPending } = useGetReportedPosts();

  if (isCheckFetching) return <MainContainer>loading...</MainContainer>;
  if (isError) return <MainContainer>권한이 없습니다.</MainContainer>;
  if (isSuccess) {
    return (
      <MainContainer>
        <section className="relative mx-auto h-full w-screen">
          <InfiniteBoardGrid
            data={data}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            isPending={isPending && isCheckFetching}
            queryKey={queryKeys.boardPosts}
          />
        </section>
      </MainContainer>
    );
  }
}
