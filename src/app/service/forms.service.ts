import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor (private http: HttpClient) {}

  getForm() {
    return this.http.get('http://localhost:3003')
  }
}
