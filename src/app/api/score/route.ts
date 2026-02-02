import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";
import { NextRequest, NextResponse } from "next/server";
import UserStats from "@/models/UserStats";

export async function POST(req: Request) {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { score } = await req.json();
    const userId = session.user.id;
    const username = session.user.name;

    const updatedStats = await UserStats.findOneAndUpdate(
      { userId },
      {
        $set: { username },
        $max: { highScore: score },
        $inc: { totalGames: 1 },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true, new: true },
    );
    return NextResponse.json(updatedStats);
  } catch (error) {
    console.error("Error updating score:", error);
    return NextResponse.json(
      { error: "Failed to update score" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({
        highScore: 0,
        totalGames: 0,
      });
    }
    const userId = session.user.id;
    const stats = await UserStats.findOne({ userId });
    if (!stats) {
      return NextResponse.json({
        highScore: 0,
        totalGames: 0,
      });
    }
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 },
    );
  }
}
