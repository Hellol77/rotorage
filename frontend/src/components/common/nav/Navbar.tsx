"use client";
import Link from "next/link";
import React, { useContext } from "react";
import { Menu } from "./menu/Menu";
import { usePathname } from "next/navigation";
import { NAVIGATION_TITLE } from "@/constants/navigation";
import MainLogoIcon from "../icon/MainLogoIcon";
import { IsLoginContext, LogoutContext } from "@/contexts/AuthContext";
import useAuth from "@/hooks/useAuth";

export default function Navbar() {
  const pathname = usePathname();
  const isLogin = useContext(IsLoginContext);
  const { logout } = useAuth();
  const isLoginNavigation = () => {
    return (
      <ul className="flex gap-8 text-sm font-extrabold">
        {isLogin ? (
          <>
            <Link className="hidden justify-end md:block" href={"/mypage"}>
              MyPage
            </Link>
            <button className="hidden justify-end md:block" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Link className="hidden justify-end md:block" href={"/login"}>
            Login
          </Link>
        )}
      </ul>
    );
  };

  return (
    <div
      className={`mr-2 flex w-screen items-center ${
        pathname === "/video" || "/" ? "bg-transparent" : "bg-[#101010]"
      } px-6 md:w-screen md:px-20 md:pt-4`}
    >
      <Link href={"/"} className="mr-8">
        <MainLogoIcon className="h-20 w-20" textColor="black" bgColor="white" />
      </Link>
      <ul className=" hidden h-20 w-full items-center  gap-8 text-sm font-extrabold md:flex">
        {NAVIGATION_TITLE.map(({ title }) => (
          <li key={title}>
            <Link href={`/${title.toLowerCase()}`}>{title}</Link>
          </li>
        ))}
      </ul>
      <ul className="flex gap-8 text-sm font-extrabold">
        {isLoginNavigation()}
      </ul>
      <Menu />
    </div>
  );
}
