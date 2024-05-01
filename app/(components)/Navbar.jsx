"use client"
import Link from "next/link";
import { getServerSession } from "next-auth";
import React from "react";
import { signOut } from "next-auth/react";
import { options } from "../api/auth/[...nextauth]/options";
import { Button } from "@/components/ui/button";

export default async function Navbar() {
  const session = await getServerSession(options);
  console.log(session, "session");
  return (
    <header className="border-b-[1.2px] border-gray-300 bg-white">
      <nav className="px-12 py-4 w-full flex items-center justify-between">
        <div>logo</div>
        <div className="flex gap-6">
          <Link href={"/"}>Home</Link>
          <Link href={"/CreateUser"}>Create User</Link>
          <Link href={"/ClientMember"}>Client Member</Link>
          <Link href={"/Member"}>Member</Link>
          <Link href={"/Denied"}>Denied</Link>
          <Link href={"/Public"}>Public</Link>
          {
            session ? (
              <Link href={"/"}>logout</Link>
            ) : (
              <Link href={"/Signin"}>Signin</Link>
            )
          }

          {session ? (
            <Link href={"/api/auth/signout?callbackUrl=/"}>logout</Link>
          ) : (
            <Link href={"/api/auth/signin"}>Login</Link>
          )}
        </div>
      </nav>
    </header >
  );
}
