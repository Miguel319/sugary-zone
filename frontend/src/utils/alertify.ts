import alertifyjs from "alertifyjs";

export default class Alertify {
  success = (message: string): void => alertifyjs.success(message);

  error = (message: string): void => alertifyjs.error(message);

  warning = (message: string): void => alertifyjs.warning(message);

  message = (message: string): void => alertifyjs.message(message);
}
