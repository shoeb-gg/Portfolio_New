import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { serverRoutes } from './app.routes.server';
import { provideLottieServerOptions } from 'ngx-lottie/server';

@NgModule({
    imports: [AppModule, ServerModule],
    providers: [
        provideServerRouting(serverRoutes),
        provideLottieServerOptions({
            preloadAnimations: {
                folder: 'src/assets/animations',
                animations: [
                    'about-me.json',
                    'about-nav.json',
                    'bangladesh.json',
                    'contact.json',
                    'projects.json',
                    'skills-nav.json',
                    'punch.json',
                    'download-resume.json',
                    'email.json',
                    'experience.json',
                    'hello.json',
                    'location.json',
                    'profile-nav.json',
                    'right-arrow.json',
                    'sent.json',
                    'strength.json',
                    'testAnim.json',
                    'thumbs-up.json',
                ],
            },
        }),
    ],
    bootstrap: [AppComponent],
})
export class AppServerModule {}
