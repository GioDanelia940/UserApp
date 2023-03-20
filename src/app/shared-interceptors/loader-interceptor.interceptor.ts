import { Injectable } from '@angular/core';
import { delay, finalize } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../shared-services/loader.service';

@Injectable()
export class LoaderInterceptorInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loaderService.isLoading.next(true);
    return next.handle(request).pipe(
      delay(200),
      finalize(() => {
        this.loaderService.isLoading.next(false);
      })
    );
  }
}
