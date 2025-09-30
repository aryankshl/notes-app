import mongoose, {Schema, Document, Model} from "mongoose";

export interface INote extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    content: string;
    createdAt: Date;
    updateAt: Date;
}

const NoteSchema: Schema<INote> = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title:{
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        content:{
            type: String,
            required: [true, "Content is required"],
            trim: true,
        }
    },
    {timestamps: true}
);

const Note: Model<INote> = mongoose.models.Note || mongoose.model<INote>("Note", NoteSchema);

export default Note;