import User from "../models/user";
import asyncHandler from "../middlewares/asyncHandler";
import ErrorResponse from "../helpers/errorResponse";
import variables from '../../variables';

const { JWT_EXPIRE } = variables;

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
    const token = user.getSignedJWTToken();
    
    // @ts-ignore
    res.status(200)
      .json({ success: true, message: "User created successfully!", token });
  }
);

exports.signin = asyncHandler(
  async (req: Request, res: Response, next: any) => {
    // @ts-ignore
    const { email, password } = req.body;

    if (!email || !password) {
      // @ts-ignore
      return next(
        new ErrorResponse(
          "Missing Data",
          "The email and password fiels are mandatory.",
          400
        )
      );
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(
        new ErrorResponse(
          "Invalid credentials",
          "Please check your credentials and try again.",
          401
        )
      );
    }

    // @ts-ignore
    const isPasswordValid = await user.matchPassword(password);

    if (!isPasswordValid) {
      // @ts-ignore
      return res.status(401).json({
        success: false,
        title: "Invalid credentials",
        message: "Please check your credentials and try again."
      });
    }

    sendToken(user, 200, "Logged in successfully!", res);
  }
);

const sendToken = (user: any, statusCode: number, message: string, res: Response) => {
  const token = user.getSignedJWTToken();

  const options = {
    expires: new Date(Date.now() + (JWT_EXPIRE as any) *24 * 60 * 60 * 1000),
    httpOnly: true
  };

  if (process.env.NODE_ENV === "production") 
    options['secure'] = true;

  const { username } = user;
    
  // @ts-ignore
  res.status(200).cookie("token", token, options)
    .json({
      success: true,
      message,
      username
    });
}


const sendErrResponse = (
  res: Response,
  title: string,
  message: string,
  statusCode: number
) => {
  // @ts-ignore
  res.status(statusCode).json({
    success: false,
    title,
    message
  });
};
