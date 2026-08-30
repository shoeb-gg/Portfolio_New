import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LottieNativeComponent } from '../lottie/lottie.component';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [LottieNativeComponent]
})
export class AboutComponent {

}
