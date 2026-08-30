import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { LottieNativeComponent } from '../lottie/lottie.component';

@Component({
    selector: 'app-photo',
    templateUrl: './photo.component.html',
    styleUrls: ['./photo.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [NgOptimizedImage, LottieNativeComponent]
})
export class PhotoComponent {}
