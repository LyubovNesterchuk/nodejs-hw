import { Schema, model } from "mongoose";

const DEFAULT_AVATAR_URL = "https://ac.goit.global/fullstack/react/default-avatar.jpg";

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
      default: DEFAULT_AVATAR_URL,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", function(next) {
  if (!this.username) {
    this.username = this.email;
  }

  if (!this.avatar) {
    this.avatar = DEFAULT_AVATAR_URL;
  }

  next();
});

userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model("User", userSchema);
