/* eslint-disable prettier/prettier */
import { ApiService } from "./api.service";

export class LogService {
  private api: ApiService;
  constructor() {
    const logUrl =   import.meta.env.VITE_API_URL  ;
    this.api = new ApiService({baseUrl: logUrl});

    //this.setToken = setToken
  }
  public async info(service: string, message: string, short_message: string, other_data?: any): Promise<void> {
    await this.api.post("log/info", {
      service: service,
      short_message: short_message,
      message: message,
    });
  }
  public async error(service: string, message: string, short_message: string, other_data?: any): Promise<void> {
    await this.api.post("log/error", {
      service: service,
      short_message: short_message,
      message: message,
    });
  }
  public async warning(service: string, message: string, short_message: string, other_data?: any): Promise<void> {
    await this.api.post("log/error", {
      service: service,
      short_message: short_message,
      message: message,
    });
  }
}
