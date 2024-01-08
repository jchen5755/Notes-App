import { InferSchemaType, Schema, model } from "mongoose";

// outlines the schema use to store notes in the DB
const noteSchema = new Schema(
    {
        title: { type: String, required: true },
        text: { type: String },
    },
    { timestamps: true }
);

// creates a type for TS
type Note = InferSchemaType<typeof noteSchema>;

// export the note model to use in code
export default model<Note>("Note", noteSchema);
