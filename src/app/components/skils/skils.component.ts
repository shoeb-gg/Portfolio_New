import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LottieNativeComponent } from '../lottie/lottie.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-skils',
    templateUrl: './skils.component.html',
    styleUrls: ['./skils.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [LottieNativeComponent, NgOptimizedImage]
})
export class SkilsComponent {

}
