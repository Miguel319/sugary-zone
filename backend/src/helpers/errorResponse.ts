export default class ErrorResponse extends Error {
  title!: string;
  statusCode!: number;

  constructor(title: string, message: string, statusCode: number) {
    super(message);
    this.title = title;
    this.statusCode = statusCode;
  }
}
