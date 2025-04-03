import { NgModule } from '@angular/core';
import {
    BrowserModule,
    provideClientHydration,
    withEventReplay,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
    provideHttpClient,
    withFetch,
    withInterceptorsFromDi,
} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LottieComponent } from 'ngx-lottie';
import { provideLottieOptions } from 'ngx-lottie';

import { NavbarComponent } from './components/navbar/navbar.component';
import { ContainerModule } from './container/container.module';

@NgModule({
    declarations: [AppComponent, NavbarComponent],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ContainerModule,
        LottieComponent,
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi(), withFetch()),
        provideLottieOptions({
            player: () => import('lottie-web/build/player/lottie_light'),
        }),

        provideClientHydration(withEventReplay()),
    ],
})
export class AppModule {}
