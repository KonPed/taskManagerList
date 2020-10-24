import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {List} from '../models/list';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  readonly ROOT_URL;

  constructor(private httpClient: HttpClient) {
    this.ROOT_URL = 'http://localhost:3000';
  }

  // public createList(list: List) {
  //   return this.httpClient.post(`${this.ROOT_URL}` + '/lists', list).subscribe((result) => {
  //     console.log(result);
  //   }, (error => {
  //     console.log(error);
  //   }));
  // }

  public get(uri: string) {
    return this.httpClient.get(`${uri}`);
  }

  public post(uri: string, payload: List) {
    return this.httpClient.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  public patch(uri: string, payload: object) {
    return this.httpClient.patch(`${this.ROOT_URL}/${uri}`, payload);
  }

  public delete(uri: string) {
    return this.httpClient.delete(`${this.ROOT_URL}/${uri}`);
  }
}
