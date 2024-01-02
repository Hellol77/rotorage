"use client";
import React from "react";
import { Input } from "@nextui-org/react";
import { useGetProfile } from "@/hooks/queries/profileData";

export default function ProfileForm() {
  const { data, isError } = useGetProfile();
  return (
    <>
      {/* <h1 className="md:w-50 mb-4 flex w-full  font-Pretendard-SemiBold text-2xl ">
        닉네임
      </h1> */}
      <div></div>
      <Input defaultValue={data?.nickname} />
    </>
  );
}
