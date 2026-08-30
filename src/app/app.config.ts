import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay, withIncrementalHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {
    PreloadAllModules,
    provideRouter,
    withEnabledBlockingInitialNavigation,
    withInMemoryScrolling,
    withPreloading,
} from '@angular/router';
import { provideLottieOptions } from 'ngx-lottie';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection(),
        provideRouter(
            routes,
            withPreloading(PreloadAllModules),
            withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
            withEnabledBlockingInitialNavigation()
        ),
        provideHttpClient(withFetch()),
        provideLottieOptions({
            player: () => import('lottie-web/build/player/lottie_light'),
        }),
        // Sections below the fold are wrapped in `@defer (hydrate on viewport)` (container.component.html):
        // their HTML is server-rendered, their JavaScript only runs once they scroll into view.
        provideClientHydration(withEventReplay(), withIncrementalHydration()),
    ],
};
