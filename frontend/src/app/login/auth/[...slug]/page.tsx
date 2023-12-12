"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get("code");
  useEffect(() => {
    axios
      .get(`http://localhost:8080/login/kakao?code=${search}`)
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router, search]);

  return <div>page</div>;
}
