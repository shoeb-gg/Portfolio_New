import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LottieModule } from 'ngx-lottie';

import { NavbarComponent } from './components/navbar/navbar.component';
import { ContainerModule } from './container/container.module';

export function playerFactory() {
    return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}

@NgModule({ declarations: [AppComponent, NavbarComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ContainerModule,
        LottieModule.forRoot({ player: playerFactory })], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
