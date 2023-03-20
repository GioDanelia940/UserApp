import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    const url: string = 'http://localhost:3000/users';
    return this.http.get(url);
  }
  getUserById(id: number): Observable<any> {
    const url: string = `http://localhost:3000/users/${id}`;
    return this.http.get(url);
  }
  getFriendList(id: number): Observable<any> {
    const url: string = `http://localhost:3000/users/${id}/friends`;
    return this.http.get(url);
  }
  getUsersByPage(page: number): Observable<any> {
    const url: string = `http://localhost:3000/users?_page=${page}&_limit=2`;
    return this.http.get(url);
  }
  getFriendsByPage(id: number, page: number): Observable<any> {
    const url: string = `http://localhost:3000/users/${id}/friends?_page=${page}&_limit=2`;
    return this.http.get(url);
  }
}
