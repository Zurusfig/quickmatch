import mongoose, { Schema, model, models } from "mongoose";

const UserStatsSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  username: String,
  highScore: {
    type: Number,
    default: 0,
  },
  totalGames: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserStats = models.UserStats || model("UserStats", UserStatsSchema);

export default UserStats;
