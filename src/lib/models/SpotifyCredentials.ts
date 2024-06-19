import mongoose, { Model, mongo } from "mongoose";

const SpotifyCredentialsSchema = new mongoose.Schema(
    {
        access_token: {
            type: String,
            required: true,
        },
        refresh_token: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            versionKey: false,
            virtuals: false,
            transform: (_, ret) => {
                delete ret._id;
            },
        },
    },
);

export const SpotifyCredentials: Model<SpotifyCredentials> = mongoose.models.SpotifyCredentials ?? mongoose.model<SpotifyCredentials>("SpotifyCredentials", SpotifyCredentialsSchema);  