import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rate } from '../models/rate';
import { Symbols } from '../models/symbols';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  data(currency: string[]): Observable<Rate> {
    return this.http.get<Rate>(
      `https://api.exchangerate.host/convert?from=${currency[0]}&to=${currency[1]}`
    );
  }
  allSymbols(): Observable<Symbols> {
    return this.http.get<Symbols>(`https://api.exchangerate.host/symbols`);
  }
}
