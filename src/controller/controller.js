import mongoose from "mongoose";
import { Feedback } from "../models/feedback.js";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

const generateAccessTokenAndRefereshToken = async function (userId, res) {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    return res.json({
      statuscode: 500,
      message:
        "Something went Wrong while generating referesh and access token",
    });
  }
};

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

//signup
export const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!password) {
      return res.json({
        statuscode: 400,
        message: " password is required",
      });
    }
    if (!email) {
      return res.json({
        statuscode: 400,
        message: "email is required",
      });
    }
    if (!username) {
      return res.json({
        statuscode: 400,
        message: "username is required",
      });
    }
    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existedUser) {
      return res.json({
        statuscode: 409,
        message: "User with email or username already exists",
      });
    }

    const user = await User.create({
      username: username,
      email: email,
      password: password,
    });

    if (!user) {
      res.json({
        statuscode: 500,
        message: "Something went wrong while registering the user",
      });
    }

    res.status(201).json({
      statuscode: 200,
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      statuscode: 500,
      message: error.message,
    });
  }
};

//signin
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!password) {
      return res.json({
        statuscode: 400,
        message: " password is required",
      });
    }
    if (!email) {
      return res.json({
        statuscode: 400,
        message: "email is required",
      });
    }

    const user = await User.findOne({
      $or: [{ email }, { password }],
    });

    if (!user) {
      return res.json({
        statuscode: 404,
        message: "User does not exist",
      });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.json({
        statuscode: 401,
        message: "Invalid User credentials",
      });
    }

    const { accessToken, refreshToken } =
      await generateAccessTokenAndRefereshToken(user._id);

    const LoggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        statuscode: 200,
        user: LoggedInUser,
        accessToken,
        refreshToken,
        message: "Login SuccessFully",
      });
  } catch (error) {
    console.log(error);
    res.json({
      statuscode: 500,
      message: error.message,
    });
  }
};

//logout
export async function userLogout(req, res) {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: undefined },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
      statuscode: 200,
      message: "User Logged Out",
    });
}

const refreshAccessToken = async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    return res.json({
      statuscode: 401,
      message: "unauthorized request",
    });
  }

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = await User.findById(decodedToken?._id);

  if (!user) {
    return res.json({
      statuscode: 401,
      message: "Invalid refresh token",
    });
  }

  if (incomingRefreshToken !== user?.refreshToken) {
    return res.json({
      statuscode: 401,
      message: "Refresh token is expired or used",
    });
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefereshToken(user._id);

  // return res
  // .cookie("accessToken", accessToken, options)
  // .cookie("refreshToken", refreshToken, options)
  // .json({
  //   statuscode: 200,
  //   accessToken,
  //   refreshToken,
  //   message: "Login SuccessFully",
  // });
};

export async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!password) {
      return res.status(400).json({
        statuscode: 400,
        message: "Password is required",
      });
    }
    if (!email) {
      return res.status(400).json({
        statuscode: 400,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        statuscode: 404,
        message: "User does not exist",
      });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        statuscode: 401,
        message: "Invalid user credentials",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        statuscode: 403,
        message: "Only admins can access this route",
      });
    }

    const { accessToken, refreshToken } =
      await generateAccessTokenAndRefereshToken(user._id);

    const LoggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .cookie("adminaccessToken", accessToken, options)
      .cookie("adminrefreshToken", refreshToken, options)
      .status(200)
      .json({
        statuscode: 200,
        user: LoggedInUser,
        adminaccessToken: accessToken,
        adminrefreshToken: refreshToken,
        message: "Login successful",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statuscode: 500,
      message: error.message,
    });
  }
}

export async function feedBack(req, res) {
  try {
    const { name, email, phone, rating, message, username } = req.body;

    const feedback = new Feedback({
      username,
      fullname: name,
      email,
      phonenumber: phone,
      rating,
      message,
    });

    const savedFeedback = await feedback.save();

    res.status(201).json({
      message: "Submit Successfull",
      data: phone,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statuscode: 500,
      message: error.message,
      data: req.body,
    });
  }
}

export async function feedbackData(req, res) {
  try {
    const feedbackData = await Feedback.find();
    res.status(200).json({
      statuscode: 200,
      message: "Feedback data retrieved successfully",
      data: feedbackData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statuscode: 500,
      message: error.message,
    });
  }
}

export async function adminfeedbackdelete(req, res) {
  try {
    const id = req.params.id;

    if (!id || !isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid feedback ID" });
    }

    const deletedFeedback = await Feedback.findByIdAndDelete(id);
    if (!deletedFeedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    res
      .status(200)
      .json({ statuscode: 200, message: "Feedback deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statuscode: 500,
      message: error.message,
    });
  }
}

export async function getSingleFeedbackData(req, res) {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid feedback id" });
    }

    const singleFeedback = await Feedback.findById(id);
    if (!singleFeedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    res.status(200).json({ statuscode: 200, data: singleFeedback });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statuscode: 500,
      message: error.message,
    });
  }
}

export async function editFeedbackData(req, res) {
  try {
    const { fullname, email, phonenumber, rating, message, id } = req.body;
    console.log(req.body);

    const updatedFeedback = await Feedback.findByIdAndUpdate(
      id,
      {
        fullname,
        email,
        phonenumber,
        rating,
        message,
      },
      { new: true }
    );
    if (!updatedFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json({
      message: "Feedback updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statuscode: 500,
      message: error.message,
    });
  }
}
