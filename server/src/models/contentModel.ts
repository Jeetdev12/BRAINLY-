import mongoose, { Schema, model } from "mongoose"

const ContentSchema = new Schema(
  {
    title:   { type: String, required: true },
    link:    { type: String },
    content: { type: String },
    type: {
      type: String,
      enum: [
        "youtube",
        "twitter",
        "instagram",
        "linkedin",
        "job",
        "document",
        "notes",
        "quote",
        "email",
      ],
      required: true,
    },
    tags:      [{ type: String }],
    readLater: { type: Boolean, default: false },
    userId:    { type: mongoose.Types.ObjectId, ref: "user", required: true },
  },
  { timestamps: true }
)

export const ContentModel = model("content", ContentSchema)