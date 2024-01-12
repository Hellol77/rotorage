"use client";
import React from "react";

import { useParams } from "next/navigation";

import MainContainer from "@/components/common/ui/container/MainContainer";
import ProfileForm from "@/components/profile/ProfileForm";
import useSearchProfile from "@/hooks/queries/useSearchProfile";

export default function SearchProfilePage() {
  const { slug } = useParams();
  const searchUserId = slug[0];
  const { data } = useSearchProfile(searchUserId);
  console.log(data);
  return <MainContainer>{data && <ProfileForm user={data} />}</MainContainer>;
}
