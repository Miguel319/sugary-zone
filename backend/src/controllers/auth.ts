import User from "../models/user";
import asyncHandler from "../middlewares/asyncHandler";
import ErrorResponse from "../helpers/errorResponse";
import variables from "../../variables";
import { Response, Request } from "express";

const { JWT_EXPIRE } = variables;

export const signup = asyncHandler(
  async (req: Request, res: Response, next: any) => {
    const { username, email, password, passwordConfirmation } = req.body;

    const tempUser = { username, email, password, passwordConfirmation };

    // manageAuthErr(req, res, passwordConfirmation);

    // Create user
    const user = await User.create({
      username,
      email,
      password,
    });

    const token = (user as any).getSignedJWTToken();

    res
      .status(201)
      .json({ success: true, message: "User created successfully!", token });
  }
);

const manageAuthErr = (req: Request, res: Response, confirmation = null) => {
  // Check the username's length
  let error: ErrorResponse;
  let err = false;
  let title: string;
  let msg: string;

  if (!confirmation) {
    err = true;
    title = "Confirmation required";
    msg = "Please confirm the password.";
    error = new ErrorResponse(title, msg, 400);
  }

  if (confirmation && confirmation !== req.body.password) {
    err = true;
    title = "Passwords don't match";
    msg = "The password must be the same as the confirmation.";
    error = new ErrorResponse(title, msg, 400);
  }
  if (req.body.username && req.body.username.length < 3) {
    err = true;
    title = "The username is too short";
    msg = "The username must have at least 3 characters.";
    error = new ErrorResponse(title, msg, 400);
  }

  if (req.body.username && req.body.username.length > 15) {
    err = true;
    title = "The username is too long";
    msg = "The username can't have more than 15 characters.";
    error = new ErrorResponse(title, msg, 400);
  }

  if (
    req.body.password &&
    req.body.passwordConfirmation &&
    req.body.password.length < 5
  ) {
    err = true;
    title = "The password is too short";
    msg = "The password must be at least 5 characters long.";
    error = new ErrorResponse(title, msg, 400);
  }

  if (
    req.body.password &&
    req.body.passwordConfirmation &&
    req.body.password.length > 25
  ) {
    err = true;
    title = "The password is too short";
    msg = "The password can't have more than 25 characters.";
    error = new ErrorResponse(title, msg, 400);
  }

  return res.status(error.statusCode || 500).json({
    success: false,
    title: error["title"],
    message: error.message || "Server Error",
  });
};

export const signin = asyncHandler(
  async (req: Request, res: Response, next: any) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        title: "Missing Data",
        message: "The email and password fiels are mandatory.",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        title: "Invalid credentials",
        message: "Please check your credentials and try again.",
      });
    }

    const isPasswordValid = await (user as any).matchPassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        title: "Invalid credentials",
        message: "Please check your credentials and try again.",
      });
    }

    sendToken(user, 200, "Logged in successfully!", res);
  }
);

const sendToken = (
  user: any,
  statusCode: number,
  message: string,
  res: Response
) => {
  const token = user.getSignedJWTToken();

  const options = {
    expires: new Date(Date.now() + (JWT_EXPIRE as any) * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") options["secure"] = true;

  const { username } = user;

  res.status(200).cookie("token", token, options).json({
    success: true,
    message,
    username,
    token,
  });
};
