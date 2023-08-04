import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LottieModule } from 'ngx-lottie';

import { NavbarComponent } from './components/navbar/navbar.component';
import { ContainerModule } from './container/container.module';

export function playerFactory() {
    return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}

@NgModule({
    declarations: [AppComponent, NavbarComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        ContainerModule,
        LottieModule.forRoot({ player: playerFactory }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
