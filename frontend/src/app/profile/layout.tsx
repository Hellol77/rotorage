"use client";
import ProfileLinkButton from "@/components/common/button/ProfileLinkButton";
import BoardIcon from "@/components/common/icon/BoardIcon";
import HeartEmptyIcon from "@/components/common/icon/HeartEmptyIcon";
import ProfileIcon from "@/components/common/icon/ProfileIcon";
import MainContainer from "@/components/common/ui/container/MainContainer";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { userId } = useParams();

  return (
    <MainContainer className="flex flex-col overflow-auto md:flex-row ">
      <section className=" sticky  top-0  flex h-14 w-full items-center rounded-lg font-poorStory dark:bg-[#18181b] md:mr-4  md:h-[600px] md:w-48 md:flex-col md:gap-2 md:px-4 md:py-2">
        <ProfileLinkButton text="프로필" href={`/profile/${userId || ""}`}>
          <ProfileIcon size="16" />
        </ProfileLinkButton>
        {!userId && (
          <Link
            href={"/profile/like"}
            className="flex h-full w-full items-center justify-center gap-4 rounded-xl hover:bg-[#272727] md:h-12 md:justify-start md:pl-2"
          >
            <HeartEmptyIcon size="16" />
            <p>좋아요</p>
          </Link>
        )}
        <ProfileLinkButton text="게시물" href={`/profile/${userId || ""}/post`}>
          <BoardIcon size="16" />
        </ProfileLinkButton>
      </section>

      {children}
    </MainContainer>
  );
}
