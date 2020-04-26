export default class ErrorResponse extends Error {
  private title: string;
  private statusCode: number;

  constructor(title: string, message: string, statusCode: number) {
    super(message);
    this.title = title;
    this.statusCode = statusCode;
  }

  getTitle = (): string => this.title;

  getStatusCode = (): number => this.statusCode;
}
