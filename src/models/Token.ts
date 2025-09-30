import mongoose, {Schema, Document, Model} from "mongoose";

export interface IToken extends Document {
    userId: mongoose.Types.ObjectId; // mongoose special type to link the the Schema to another Document id;
    token: string;
    type: "verify" | "reset";
    expiresAt: Date;
    createAt: Date;
}

const TokenSchema: Schema<IToken> = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // this links the token to the specific user
            required: true,
        },

        token: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            enum: ["verify", "reset"],
            required: true,
        },

        expiresAt: {
            type: Date,
            required: true,
        },
    },
    {timestamps: true}
);

const Token: Model<IToken> = mongoose.models.Token || mongoose.model<IToken>("Token", TokenSchema);

export default Token;