"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import LoadingIcons from 'react-loading-icons'
import Link from "next/link";

import ParticlesContainer from "@/components/ParticlesContainer";

function RankingCard({ player, index, type }: { player: any, index: number, type: string }) {
    let moreStyles = "bg-white border-white"
    if (index == 0) {
        moreStyles = "bg-yellow-200/50 border-yellow-300/50"
    } else if (index == 1) {
        moreStyles = "bg-gray-500/50 border-gray-600/50"
    } else if (index == 2) {
        moreStyles = "bg-amber-500/50 border-amber-600/50"
    }
    return (
        <div className={`flex flex-row gap-[1rem] justify-between items-center font-bold w-[100%] px-4 py-1 m-1 border-2 rounded-2xl ${moreStyles}`}>
            <div className="text-xl min-w-[10%] text-end">{index + 1}</div>
            <div className="text-md min-w-[70%] text-center">{player.username}</div>
            {type === "score" ? <div className="text-md min-w-[10%] text-center">{player.highScore}</div> : <div className="text-md min-w-[10%] text-center">{player.totalGames}</div>}
        </div>
    )
}

function TopScoreBoard() {
    const { data: session, status } = useSession();
    const [topPlayers, setTopPlayers] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    useEffect(() => {
        const fetchTopPlayers = async () => {
            setLoading(true);
            const response = await fetch('/api/topplayers');
            const data = await response.json();
            if (data.error) {
                setError(data.error);
                return;
            }
            setTopPlayers(data);
            setLoading(false);
        }
        fetchTopPlayers();
    }, [session]);

    if (topPlayers.length < 5) {
        for (let i = topPlayers.length; i < 5; i++) {
            topPlayers.push({
                _id: i,
                userId: "0",
                username: "---",
                highScore: 0,
                totalGames: 0,
                createdAt: new Date()
            })
        }
    }

    return (
        <div className="min-w-[20rem] min-h-[20rem] flex flex-col gap-[1rem] bg-amber-400 px-[1rem] py-[2rem] rounded-2xl z-999 items-center">
            <h1 className="text-2xl font-bold z-100 h-[20%] mt-[1rem]">Score Ranking</h1>
            <div className="w-[100%] bg-white rounded-2xl p-[1rem] h-[80%]">
                {loading ? (
                    <div className="flex flex-col gap-[1rem] justify-center items-center">
                        <LoadingIcons.ThreeDots stroke="oklch(66.6% 0.179 58.318)" strokeOpacity={1} strokeWidth={2} height={24} width={24} />
                    </div>
                ) : error ? (
                    <div className="text-red-500">{error}</div>
                ) : (
                    topPlayers.map((player: any, index: number) => (
                        <RankingCard player={player} index={index} key={player._id} type="score" />
                    ))
                )}
            </div>
        </div>
    )
}

function TopGamesPlayedBoard() {
    const { data: session, status } = useSession();
    const [topPlayers, setTopPlayers] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    useEffect(() => {
        const fetchTopPlayers = async () => {
            setLoading(true);
            const response = await fetch('/api/mostplayed');
            const data = await response.json();
            if (data.error) {
                setError(data.error);
                return;
            }
            setTopPlayers(data);
            setLoading(false);
        }
        fetchTopPlayers();
    }, [session]);

    if (topPlayers.length < 5) {
        for (let i = topPlayers.length; i < 5; i++) {
            topPlayers.push({
                _id: i,
                userId: "0",
                username: "---",
                highScore: 0,
                totalGames: 0,
                createdAt: new Date()
            })
        }
    }

    return (
        <div className="min-w-[20rem] min-h-[20rem] flex flex-col gap-[1rem] bg-amber-400 px-[1rem] py-[2rem] rounded-2xl z-999 items-center">
            <h1 className="text-2xl font-bold z-100 h-[20%] mt-[1rem]">Most Games Played</h1>
            <div className="w-[100%] bg-white rounded-2xl p-[1rem] h-[80%]">
                {loading ? (
                    <div className="flex flex-col gap-[1rem] justify-center items-center">
                        <LoadingIcons.ThreeDots stroke="oklch(66.6% 0.179 58.318)" strokeOpacity={1} strokeWidth={2} height={24} width={24} />
                    </div>
                ) : error ? (
                    <div className="text-red-500">{error}</div>
                ) : (
                    topPlayers.map((player: any, index: number) => (
                        <RankingCard player={player} index={index} key={player._id} type="games" />
                    ))
                )}
            </div>
        </div>
    )
}

export default function Leaderboard() {
    return (
        <div className="flex flex-col gap-[1rem] w-[100%] justify-center items-center min-h-[500px] md:min-h-screen">
            <div>
                <h1 className="text-3xl font-black z-100">Leader Board</h1>
            </div>
            <div className="flex flex-col md:flex-row gap-[6rem] p-[1rem]">
                <TopScoreBoard />
                <TopGamesPlayedBoard />
            </div>
            <Link
                href="/"
                className="flex justify-center items-center bg-amber-400 p-2 w-[20%] rounded-lg text-xl hover:bg-amber-300 cursor-pointer hover:text-gray-700 z-100"
            >
                Back
            </Link>
            <ParticlesContainer />
        </div>
    )
}