import mongoose, { Schema } from "mongoose";

const feedbackSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],

      // index:true
    },
    fullname: {
      type: String,
      required: [true, "fullname is required"],

      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
    },
    phonenumber: {
      type: String,
      required: [true, "PhoneNumber is required"],
    },
    rating: {
      type: Number,
      require: [true, "rating required"],
    },
    message: {
      type: String,
      require: [true, "messgae required"],
    },
  },
  {
    timestamps: true,
  }
);

export const Feedback = mongoose.model("Feedback", feedbackSchema);
