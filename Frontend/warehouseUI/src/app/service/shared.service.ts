import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Menu } from '../model/app-constants';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient,
    private _snackBar: MatSnackBar,
    private router: Router,
    private location: Location) { }

  get(url: any): Observable<any> {
    return this.http.get(url);
  }

  getWithParams(url: any, params: HttpParams): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get(url, { headers, responseType: 'text', 'params': params });
  }

  post(url: string, data: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(url, data, { headers, responseType: 'text' });
  }

  postForResetPwd(url: string, data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'skip': "true",
      'Authorization': `Bearer ${token}`
    });
    let options = {headers: headers};
    return this.http.post(url, data, options);
  }

  postWithParams(url: string, data: any, params: HttpParams): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(url, data, { headers, responseType: 'text', 'params': params });
  }

  put(url: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(url, { headers, responseType: 'text' });
  }

  displayMessage(err: string, classname: string) {
    if (err === 'Unknown Error') {
      err = 'Error connecting to the services, kindly contact the administrator';
    }
    else if (err === 'OK') {
      err = 'Error submitting value, kindly contact the administrator';
    }
    this._snackBar.open(err, '', {
      duration: 2000,
      panelClass: [classname],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  isAllowedToVisitPage() {
    let currentPath = this.location.path();
    let sidebarMenu = Menu.sidebarMenu.filter(menu => menu.link == currentPath);
    let currentRole = localStorage.getItem('role');
    if (currentRole && sidebarMenu && sidebarMenu[0] && sidebarMenu[0].supportedRoles && sidebarMenu[0].supportedRoles.indexOf(currentRole) != -1) {
      console.log('Valid user page');
    } else {
      this.displayMessage('Invalid page or You are not authorized to view the page!!', 'green-snackbar');
      this.router.navigateByUrl('/');
    }
  }

  get role() {
    return localStorage.getItem('role');
  }

  get isManager() {
    return localStorage.getItem('role') == 'Manager' ? true : false;
  }

  get isSalesPerson() {
    return localStorage.getItem('role') == 'SalesPerson' ? true : false;
  }

  get isPacker() {
    return localStorage.getItem('role') == 'Packer' ? true : false;
  }

  get isDriver() {
    return localStorage.getItem('role') == 'Driver' ? true : false;
  }
}
