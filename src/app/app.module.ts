import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ViewComponent } from './view/view.component';
import { CardItemComponent } from './view/card-item/card-item.component';
import { UserPageComponent } from './view/user-page/user-page.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from 'src/material.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FriendItemComponent } from './view/user-page/friend-item/friend-item.component';
import { LoaderInterceptorInterceptor } from './shared-interceptors/loader-interceptor.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
    CardItemComponent,
    UserPageComponent,
    HeaderComponent,
    FriendItemComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
