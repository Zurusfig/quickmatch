import mongoose, {Schema, model, models} from "mongoose";

const ScoreSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    username: String,
    value: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Score = models.Score || model("Score", ScoreSchema);

export default Score;

