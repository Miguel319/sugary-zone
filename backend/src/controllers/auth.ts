import User from "../models/user";
import asyncHandler from "../middlewares/asyncHandler";

exports.signup = asyncHandler(
  async (req: Request, res: Response, next: any) => {
    // @ts-ignore
    const { username, email, password, passwordConfirmation } = req.body;

    if (!passwordConfirmation) {
      return sendErrResponse(
        res,
        "Confirmation required",
        "Please confirm the password.",
        400
      );
    }

    if (passwordConfirmation !== password) {
      return sendErrResponse(
        res,
        "Passwords don't match",
        "The password must be the same as the confirmation.",
        400
      );
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password
    });

    // @ts-ignore
    res.status(200)
      .json({ success: true, message: "User created successfully!" });
  }
);


const sendErrResponse = (
  res: Response,
  title: string,
  message: string,
  statusCode: number
) => {
  // @ts-ignore
  res.status(statusCode).json({
    success: false,
    title, message
  });
};
