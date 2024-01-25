"use client";
import MainContainer from "@/components/common/container/MainContainer";
import useCheckAdmin from "@/hooks/queries/admin/useCheckAdmin";
import Link from "next/link";

export default function AdminPage() {
  const { isError, isFetching: isCheckFetching, isSuccess } = useCheckAdmin();

  if (isCheckFetching) return <MainContainer>loading...</MainContainer>;
  if (isError) return <MainContainer>권한이 없습니다.</MainContainer>;
  if (isSuccess) {
    return (
      <MainContainer>
        <Link className="h-10 w-fit bg-gray-800" href={"/admin/post"}>
          post
        </Link>
        <Link className="h-10 w-fit bg-gray-800" href={"/admin/comment"}>
          comment
        </Link>
      </MainContainer>
    );
  }
}
