"use client"
import { Trophy, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image"
import LoadingIcons from 'react-loading-icons'

import { useSession } from "next-auth/react";

function LoginButton() {
    const { data: session, status } = useSession();
    if (status === "loading") {
        return (
            <div className="flex items-center text-amber-600 font-bold cursor-pointer m-8 bg-amber-200 p-2 rounded-full border-2 border-amber-600 opacity-50 hover:opacity-100 transition-[opacity] duration-200 ease-in-out">
                <div className="mr-2">
                    <User size={24} color="oklch(66.6% 0.179 58.318)" />
                </div>
                <div className="flex flex-col">
                    <LoadingIcons.ThreeDots stroke="oklch(66.6% 0.179 58.318)" strokeOpacity={1} strokeWidth={2} height={24} width={24} />
                </div>
            </div>
        );
    }

    if (status === "authenticated") {
        return (
            <div className="flex items-center text-amber-600 font-bold cursor-pointer m-8 bg-amber-200 p-2 rounded-full border-2 border-amber-600 opacity-50 hover:opacity-100 transition-[opacity] duration-200 ease-in-out">
                <div className="mr-2">
                    <User size={24} color="oklch(66.6% 0.179 58.318)" />
                </div>
                <Link href="/api/auth/signout" className="flex flex-col">
                    {session.user?.name}
                </Link>
            </div>
        );
    }

    return (<div className="flex items-center text-amber-600 font-bold cursor-pointer m-8 bg-amber-200 p-2 rounded-full border-2 border-amber-600 opacity-50 hover:opacity-100 transition-[opacity] duration-200 ease-in-out">
        <div className="mr-2">
            <User size={24} color="oklch(66.6% 0.179 58.318)" />
        </div>
        <Link href="/api/auth/signin" className="flex flex-col">
            Sign In
        </Link>
    </div>)
}

export default function NavBar() {
    return (
        <div className="absolute top-0 left-0 w-[100vw] h-[6rem] z-100 flex items-center justify-between">
            <Link href="/leaderboard"><div className="font-bold text-5xl cursor-pointer m-8 bg-amber-200 p-2 rounded-full border-2 border-amber-600 opacity-50 hover:opacity-100 transition-[opacity] duration-200 ease-in-out"><Trophy size={24} color="oklch(66.6% 0.179 58.318)" /></div></Link>
            <LoginButton />
        </div>
    );
}