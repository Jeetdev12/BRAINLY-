import mongoose, { Schema, model } from "mongoose";

const ContentSchema = new Schema(
  {
    title: { type: String, required: true },
    link: { type: String },
    content: { type: String }, // 🆕 for notes, email, or any text content
    type: {
      type: String,
      enum: [
        "youtube",
        "twitter",
        "document",
        "notes",
        "linkedin",
        "email",
      ], // 🧩 ensures valid content types
      required: true,
    },
    tags: [{ type: mongoose.Types.ObjectId, ref: "Tags" }],
    userId: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  },
  { timestamps: true }
);

export const ContentModel = model("content", ContentSchema);
