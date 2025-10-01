import mongoose, {Schema, Model, Document } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    oldPasswords: [string];
    isVerified: boolean;
    createdAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: [true, "Password is required"],
        },
        oldPasswords: {
            type: [String],
            default: [],
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true} // this automatically adds createdAt and updatedAt fields
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
// the above line prevents OverrideModelError in Nextjs as it first checks if a model exists before creating a new one

export default User;