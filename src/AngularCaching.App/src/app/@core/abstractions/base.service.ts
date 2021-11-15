import { HttpClient } from "@angular/common/http";



export interface BaseService {
  _client: HttpClient;
  _baseUrl:string;
}
