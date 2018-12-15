import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpClient: HttpClient) { }

  getMessageByProtocol(protocol: String) {
    return this.httpClient
      .get(`${environment.api_url}/messages/${protocol}`)
  }

  sendMessage(dados) {
    return this.httpClient
      .post(`${environment.api_url}/messages`, dados)
  }

}
