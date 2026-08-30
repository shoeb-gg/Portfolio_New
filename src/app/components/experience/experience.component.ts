import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LottieNativeComponent } from '../lottie/lottie.component';

@Component({
    selector: 'app-experience',
    templateUrl: './experience.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [LottieNativeComponent],
})
export class ExperienceComponent {}
