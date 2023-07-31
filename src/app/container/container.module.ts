import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerRoutingModule } from './container-routing.module';
import { ContainerComponent } from './container.component';

import { LottieComponent } from '../components/lottie/lottie.component';

import { NameComponent } from '../components/name/name.component';
import { PhotoComponent } from '../components/photo/photo.component';
import { AboutComponent } from '../components/about/about.component';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory() {
    return player;
}

@NgModule({
    declarations: [
        LottieComponent,
        ContainerComponent,
        NameComponent,
        PhotoComponent,
        AboutComponent,
    ],
    imports: [
        CommonModule,
        ContainerRoutingModule,
        LottieModule.forRoot({ player: playerFactory }),
    ],
    exports: [LottieComponent],
})
export class ContainerModule {}
