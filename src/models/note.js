import { Schema, model } from "mongoose";
import { TAGS } from "../constants/tags.js";

const notesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: "",
    },
    tag: {
      type: String,
      enum: TAGS,
      default: "Todo",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform(_doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
      },
    },
  }
);

notesSchema.index({ title: "text", content: "text" });

export const Note = model("Note", notesSchema);


// import { Schema, model } from "mongoose";
// import { TAGS } from "../constants/tags.js";
// const notesSchema = new Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     content: {
//       type: String,
//       default: "",
//     },
//     tag: {
//       type: String,
//       enum: TAGS,
//       default: "Todo",
//     },
//     userId: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//     },
//   },
//   {
//     timestamps: true,
//     versionKey: false,
//   },
// );

// notesSchema.index({ title: "text", content: "text" });

// export const Note = model("Note", notesSchema);
