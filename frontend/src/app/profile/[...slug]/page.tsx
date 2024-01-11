"use client";
import React, { useContext } from "react";

import { useParams } from "next/navigation";

import MainContainer from "@/components/common/ui/container/MainContainer";
import ProfileForm from "@/components/profile/ProfileForm";
import { UserDataContext } from "@/contexts/AuthContext";

export default function SearchProfilePage() {
  const { slug } = useParams();
  console.log(slug);
  const { user } = useContext(UserDataContext);

  return (
    <MainContainer>
      {/* <ProfileForm /> */}dd
    </MainContainer>
  );
}
