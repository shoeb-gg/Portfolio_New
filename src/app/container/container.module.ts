import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerRoutingModule } from './container-routing.module';
import { ContainerComponent } from './container.component';

import { NameComponent } from '../components/name/name.component';
import { PhotoComponent } from '../components/photo/photo.component';
import { LottieComponent } from '../components/lottie/lottie.component';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory() {
    return player;
}

@NgModule({
    declarations: [
        ContainerComponent,
        NameComponent,
        PhotoComponent,
        LottieComponent,
    ],
    imports: [
        CommonModule,
        ContainerRoutingModule,
        LottieModule.forRoot({ player: playerFactory }),
    ],
})
export class ContainerModule {}
