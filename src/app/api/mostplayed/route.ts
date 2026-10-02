import mongoose from "mongoose";
import { NextRequest } from "next/server";
import UserStats from "@/models/UserStats";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const players = await UserStats.find().sort({ totalGames: -1 }).limit(5);
    return NextResponse.json(players);
  } catch (error) {
    console.error("Error fetching top players:", error);
    return NextResponse.json(
      { error: "Failed to fetch top players" },
      { status: 500 },
    );
  }
}
