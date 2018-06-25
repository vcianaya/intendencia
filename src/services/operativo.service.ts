import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { GLOBAL } from "./global";
@Injectable()
export class OperativoService {
  url: string;
  constructor(private httpClient: HttpClient) {
    this.url = GLOBAL.url;
  }
  register(operativo): Observable<any> {    
    let params = JSON.stringify(operativo);
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
      // .set('Authorization', "Bearer " + localStorage.getItem('token'));
    return this.httpClient.post(this.url + 'saveOperativo', params, { headers: headers });
  }

  login(data): Observable<any> {    
    let params = JSON.stringify(data);
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json');      
    return this.httpClient.post(this.url + 'login', params, { headers: headers });
  }
}