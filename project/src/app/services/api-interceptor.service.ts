import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // Modify the request here
    if (request.url.includes('/admin')) {
      if(localStorage.getItem('adtoken')){
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${localStorage.getItem('adtoken')}`
          }
        });
      }
     
    }else{
      if(localStorage.getItem('token')){
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
      }
    }

    return next.handle(request);
  }
}
