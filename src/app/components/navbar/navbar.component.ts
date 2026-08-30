import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LottieNativeComponent } from '../lottie/lottie.component';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [LottieNativeComponent],
})
export class NavbarComponent {
    scrollTrigger(div: string) {
        document.getElementById(div)!.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
        });
    }
}
