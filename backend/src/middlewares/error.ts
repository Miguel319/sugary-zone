import ErrorResponse from "../helpers/errorResponse";
import { Request, Response } from "express";

const errorHandler = (err: Error, req: Request, res: Response, next: any) => {
  let error = { ...err };
  let title = "Unexpected Error";
  let msg = "";

  error.message = err.message;
  console.log(error);

  if (
    err.name === "ValidationError" ||
    err["code"] === 11000 ||
    err.name === "CastError"
  ) {
    manageMongooseErr(req, res, title, msg, error, err);
  }
};

const manageMongooseErr = (
  req: Request,
  res: Response,
  title: string,
  msg: string,
  error: Error,
  err: Error
) => {
  let thereIsAnError = false;

  // Required fields
  if (err.name === "ValidationError") {
    thereIsAnError = true;
    title = err.message.includes("mandatory")
      ? "Required fields"
      : "Validation Error";
    console.log(err.message);
    msg = err.message.split(" ").slice(4).join(" ");
    error = new ErrorResponse(title, msg, 400);
  }

  // Mongoose duplicate key
  if (err["code"] === 11000) {
    thereIsAnError = true;
    const record = err.message.includes("username")
      ? "a username"
      : err.message.includes("email")
      ? "an email"
      : err.message.includes("title")
      ? "a title"
      : "a record";

    title = "Duplicate data";
    msg = `There's already ${record} of this value in the database.`;
    error = new ErrorResponse(title, msg, 401);
  }

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    thereIsAnError = true;
    title = "Data not found";
    msg = `Unable to find ${err["value"]}.`;
    error = new ErrorResponse(title, msg, 404);
  }

  if (!thereIsAnError) return;

  return sendError(res, error);
};

const sendError = (res: Response, error: any) => {
  return res.status(error.status || 500).json({
    success: false,
    title: error["title"],
    message: error.message || "Server Error",
  });
};

export default errorHandler;
